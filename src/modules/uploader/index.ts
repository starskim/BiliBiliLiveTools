import * as fs from "fs"
import {join} from "path"
import {VideoPart} from './VideoPart'
import {getCsrf} from "utils"
import config from "utils/config"
import * as chalk from 'chalk'
import got from "utils/got"
import sign from "utils/sign"
import * as crypto from 'crypto'
import sleep from "utils/sleep"
import * as FormData from 'form-data'
import {CookieJar} from 'tough-cookie'
import {promisify} from "util";

const logger = require('utils/logger').logger('Uploader')
const videoPartLimitSize = 1024 * 1024 * config.get('UploaderInfo.videoPartLimitSize') || 1024 * 1024 * 8
const videoPartLimitInput = config.get('UploaderInfo.videoPartLimitSize')
const cookieJar = new CookieJar()
const setCookie = promisify(cookieJar.setCookie.bind(cookieJar))

const readDirSync = (path: string) => {
    let paths: string[] = []
    let pa = fs.readdirSync(path);
    pa.forEach(function (ele: string) {
        paths.push(join(path, ele))
    })
    return paths
}

/*
Args:
    copyright: 原创/转载.
    title: 投稿标题.
    tid: 分区id.
    tag: 标签.
    desc: 投稿简介.
    source: 转载地址.
    cover: 封面图片文件路径.
    no_reprint: 可否转载.
    open_elec: 充电.
Returns:
    (aid, bvid)
    aid: av号
    bvid: bv号
*/

const upload = async (dirName: string, title: string) => {
    const paths = readDirSync(dirName)
    let parts: VideoPart[] = []
    for (let key in paths) {
        parts.push({
            path: paths[key],
            title: `P${parseInt(key) + 1}`,
            desc: ""
        })
    }
    logger.debug(`upload paths: ${paths} \n parts: ${JSON.stringify(parts, null, 2)}`)
    const payload = {
        copyright: config.get('UploaderInfo.copyright'),
        title: title,
        tid: config.get('UploaderInfo.tid'),
        tag: config.get('UploaderInfo.tags').join(','),
        desc: config.get('UploaderInfo.desc'),
        source: config.get('UploaderInfo.copyright') == 2 ? `https://live.bilibili.com/${config.get('StreamInfo.room_id')}` : '',
        cover: await upload_cover(),
        no_reprint: config.get('UploaderInfo.no_reprint') || 1,
        open_elec: config.get('UploaderInfo.open_elec') || 1,
        videos: []
    }
    logger.info(`开始上传稿件 ${dirName}`)
    for (let video_part of parts) {
        video_part.server_file_name = await upload_video_part(video_part, 5)
        logger.debug(`function upload server_file_name: ${video_part.server_file_name}`)
        video_part.server_file_name && payload.videos.push({
            // @ts-ignore
            desc: video_part.desc,
            // @ts-ignore
            filename: video_part.server_file_name,
            // @ts-ignore
            title: video_part.title
        })
    }

    const {data: {myinfo}} = await got.get('https://member.bilibili.com/x/web/archive/pre?lang=cn').json()
    const {data} = await got.get('https://member.bilibili.com/x/web/index/stat').json()
    myinfo.total_info = data
    let user_weight = myinfo.level > 3 && myinfo.total_info && myinfo.total_info.total_fans > 100 ? 2 : 1;
    user_weight == 2 ? logger.info(`用户权重: ${user_weight} => 网页端分p数量不受限制使用网页端api提交`) : logger.info(`用户权重: ${user_weight} => 网页端分p数量受到限制使用客户端api端提交`)
    for (let i = 1; i <= 5; i++) {
        try {
            const result = await got.post(user_weight == 2 ? 'https://member.bilibili.com/x/vu/web/add' : 'http://member.bilibili.com/x/vu/client/add', {
                searchParams: user_weight == 2 ? {
                    csrf: await getCsrf()
                } : sign({}),
                json: payload
            }).json()
            // console.log("Upload ended, returns:", ${JSON.stringify(result)})
            if (result.code !== 0) {
                return logger.error(`Upload failed: ${JSON.stringify(result)}`)
            }
            return logger.info(`Upload ended, returns:, ${JSON.stringify(result)}`)
        } catch (error) {
            logger.error(`Final upload error: ${error}, retry in 10 seconds...`)
            if (i === 5) {
                return logger.error(`An error occurred when final upload: ${error}`)
            }
            await sleep(10000)
        }
    }
}

const upload_cover = async () => {
    if (config.get('UploaderInfo.cover')) {
        if (fs.statSync(config.get('UploaderInfo.cover')).isFile()) {
            const payload = new FormData();
            payload.append('file', config.get('UploaderInfo.cover'), {
                filename: 'cover.png',
                contentType: 'image/png'
            })
            const {data: {url}} = await got.post('http://member.bilibili.com/x/vu/client/cover/up', {
                searchParams: sign({}),
                body: payload
            }).json()
            return url
        }
    }
    return ''
}

const upload_video_part = (video_part: any, retryTimes: number) => {
    return new Promise(async (resolve, reject) => {
        const local_file_name = video_part.path
        const fileSize = fs.statSync(local_file_name).size;
        if (fileSize < videoPartLimitSize) {
            logger.info(`${chalk.red('放弃该分P上传')} ${local_file_name}, 文件大小 ${Math.round(fileSize / 1024 / 1024)}M, 未满足文件上传大小要求${videoPartLimitInput}M`)
            return resolve(false)
        }
        const pre_upload_data = await got.get('https://member.bilibili.com/preupload', {
            searchParams: {
                access_key: config.get('bilibiliInfo.access_key'),
                mid: config.get('bilibiliInfo.uid'),
                profile: 'ugcfr/pc3'
            }
        }).json()

        const upload_url = pre_upload_data['url']
        const complete_upload_url = pre_upload_data['complete']

        const server_file_name = pre_upload_data['filename']

        const chunkSize = 1024 * 1024 * 8 //每 chunk 8M

        let chunkNum = Math.ceil(fileSize / chunkSize)
        let fileStream = fs.createReadStream(video_part.path)
        let readBuffers: (string | Buffer)[] = []
        let readLength = 0
        let totalReadLength = 0
        let nowChunk = 0
        let fileHash = crypto.createHash('md5')

        // console.log(`开始上传 ${local_file_name}，文件大小：${fileSize}，分块数量：${chunkNum}`);
        logger.info(`开始上传 ${local_file_name}，文件大小：${fileSize}，分块数量：${chunkNum}`)
        logger.debug(server_file_name)
        fileStream.on('data', async (chunk) => {
            readBuffers.push(chunk)
            readLength += chunk.length
            totalReadLength += chunk.length
            fileHash.update(chunk)
            if (readLength >= chunkSize || totalReadLength === fileSize) {
                nowChunk++
                // console.log(`正在上传 ${local_file_name} 第 ${nowChunk}/${chunkNum} 分块`);
                logger.info(`正在上传 ${local_file_name} 第 ${nowChunk}/${chunkNum} 分块`)
                fileStream.pause()
                try {
                    await upload_chunk(upload_url, server_file_name, local_file_name, readBuffers, readLength, nowChunk, chunkNum, retryTimes)
                } catch (error) {
                    return reject(`An error occurred when upload video part: ${error}`)
                }
                fileStream.resume()
                readLength = 0
                readBuffers = []
                // console.log(err.response.text);
                // logger.info(err.response.text)
            }
        })
        fileStream.on('end', async () => {
            const payload = {
                chunks: chunkNum,
                filesize: fileSize,
                md5: fileHash.digest('hex'),
                name: local_file_name,
                version: '2.3.0.1063',
            }

            for (let i = 1; i <= 5; i++) {
                try {
                    let body = await got.post(complete_upload_url, {
                        form: payload
                    }).json()
                    // console.log(JSON.stringify(body)
                    logger.info(`video part ${video_part.path} ${video_part.title} uplaod ended, returns ${JSON.stringify(body)}`)
                    return resolve(server_file_name)
                } catch (error) {
                    // console.log(err)
                    // logger.info(err)
                    logger.error(`Merge file error: ${error}, retry in 10 seconds...`)
                    if (i === 5) {
                        return reject(`An error occurred when merge file: ${error}`)
                    }
                    await sleep(10000)
                }

            }
        })
        fileStream.on('error', (error) => {
            logger.error(`An error occurred while listening fileStream: ${error}`)
        })
    })
}

const upload_chunk = async (upload_url: string, server_file_name: any, local_file_name: any, chunk_data: (string | Buffer)[] | readonly Uint8Array[], chunk_size: number, chunk_id: number, chunk_total_num: number, retryTimes: number) => {
    let chunkHash = crypto.createHash('md5')
    for (let v of chunk_data) {
        chunkHash.update(v)
    }
    const payload = new FormData()
    payload.append('version', '2.3.0.1063')
    payload.append('filesize', chunk_size)
    payload.append('chunk', chunk_id)
    payload.append('chunks', chunk_total_num)
    payload.append('md5', chunkHash.digest('hex'))
    // @ts-ignore
    payload.append('file', Buffer.concat(chunk_data), {
        filename: local_file_name,
        contentType: 'application/octet-stream'
    })
    await setCookie(`PHPSESSID=${server_file_name}`, upload_url);
    for (let i = 1; i <= retryTimes; i++) {
        try {
            const body = await got.post(upload_url, {
                body: payload
            }).json()
            // console.log(`chunk #${chunk_id} upload ended, returns: ${r.text}`)
            logger.info(`chunk #${chunk_id} upload ended, returns: ${JSON.stringify(body)}`)
            return
        } catch (error) {
            // console.log(err)
            //手动暂停 10s
            logger.error(`Upload chunk error: ${error} , retry in 10 seconds...`)
            if (i === retryTimes) {
                logger.error(`An error occurred when upload chunk: ${error}`)
            }
            await sleep(10000)
        }
    }
}

//远行
const main = async (dirName: string, title: string) => {
    await upload(dirName, title)
}

export default (dirName: string, title: string) => main(dirName, title)
