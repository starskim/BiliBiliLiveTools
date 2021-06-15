// const crypto = require('crypto')
// import * as Live from 'bilibili-live-ws'
// import got from "../utils/got"
// import sign from "../utils/sign"
import config from "utils/config"
// import sleep from "../utils/sleep"
// import {getCsrf} from "../modules/User"
// import auth from "../modules/auth"
// import Live from "../modules/Live"
// import DanMuInfo from "modules/DanMuKu"
// import auth from "../modules/Auth"
// import uploader from "../modules/uploader"
// import * as chalk from 'chalk'
// import * as fs from "fs"
// import * as FormData from 'form-data'
// import sendanmu from '../modules/send/SendDanMu'
// import SendDingTalk from "../modules/send/SendDingTalk";
// import Notice from "modules/Notice"
// import {getRoomInfo} from "utils"
// const rootPath = process.cwd();
import koishi from "modules/koishi"
import web from "modules/web/index"

const logger = require('utils/logger').logger('测试')

logger.debug('测试')
const test = async () => {

    if (config.get('connect.port')) {
        web.listen(config.get('connect.port'), parseInt(config.get('connect.listenInaddrAny')) ? undefined : '127.0.0.1')
        logger.debug('Listening Port ' + config.get('connect.port'))

    }
    koishi()
    // await auth()
    // await sendanmu('test')
    // const live = new Live.KeepLiveTCP(230890)
    // live.on('live', () => logger.info('连接到直播间'))
    // live.on('live', () => {
    //     live.on('heartbeat', console.log)
    //     live.on('send',console.log)
    // })
    // live.send(Buffer.from('测试'))
    // const payload = `msg[sender_uid]=7805055&msg[receiver_id]=13684242&msg[receiver_type]=1&msg[msg_type]=1&msg[content]={'content':'hello'}&csrf_token=ef2c39f96ce4bf852db5baeeda4f20f5`;
    // const msg=["sender_uid","receiver_id"]
    // msg[sender_uid]='54897'
    // const payload={}
    // const user_info = await getCsrf();

    // var payload = {
    //     'msg[sender_uid]': config.get("bilibiliInfo.uid"),
    //     'msg[receiver_id]': 13684242,
    //     'msg[receiver_type]': 1,
    //     'msg[msg_type]': 1,
    //     'msg[content]': `{"content":"测试"}`,
    //     'msg[timestamp]': Date.now(),
    //     'msg[dev_id]': 'A3BD19D4-53C6-4C19-ABB1-EDF39C57444C',
    //     csrf: user_info,
    //     csrf_token: user_info
    // }
    // const body = await got.post('https://api.vc.bilibili.com/web_im/v1/web_im/send_msg', {
    //     form: payload
    // }).json()
    // const mac = [
    //     (0x52).toString(16),
    //     (0x54).toString(16),
    //     (0x00).toString(16),
    //     Math.floor((Math.random() * 0xff)).toString(16),
    //     Math.floor((Math.random() * 0xff)).toString(16),
    //     Math.floor((Math.random() * 0xff)).toString(16)
    // ]
    // logger.debug(mac.join(':'))
    // const md5 = crypto.createHash('md5').update(mac.join(':')).digest('hex')
    // logger.debug(md5)
    // const md5_arr = md5.split('')
    // const Buvid = `XY${md5_arr[2]}${md5_arr[12]}${md5_arr[22]}${md5}`
    // logger.debug(Buvid.toUpperCase())
    // const payload = {
    //     room_id: '12018181',
    //     title: '测试',
    //     csrf: user_info
    // }
    // const body = await got.post('http://api.live.bilibili.com/room/v1/Room/update',
    //     {
    //         form: payload
    //     },
    // ).json()
    // logger.debug(JSON.stringify(body))
    // await Live()
    // while (true) {
    //     await auth()
    //     await sleep(1000)
    // }
    // let fileSize = fs.statSync(`/Volumes/Record/bilibili_record/54897-Ruriko琉璃子Channel/20210324/06P.mp4`).size
    // const chunkSize = 5 * 1024 * 1024 //每 chunk 5M
    // const chunkNum = Math.ceil(fileSize / chunkSize)
    // logger.debug(fileSize)
    // logger.debug(chunkSize)
    // logger.debug(fileSize / chunkSize)
    // logger.debug(chunkNum)
    // const {data: {myinfo}} = await got.get('https://member.bilibili.com/x/web/archive/pre?lang=cn').json()
    // const {data} = await got.get('https://member.bilibili.com/x/web/index/stat').json()
    // myinfo.total_info = data
    // let user_weight
    // if (myinfo.level > 3 && myinfo.total_info && myinfo.total_info.total_fans > 100) {
    //     user_weight = 2
    // } else {
    //     user_weight = 1
    // }
    // if (user_weight == 2) {
    //     logger.info(`用户权重: ${user_weight} => 网页端分p数量不受限制使用网页端api提交`)
    // }
    // logger.info(`用户权重: ${user_weight} => 网页端分p数量受到限制使用客户端api端提交`)
    // logger.debug(JSON.stringify(myinfo['total_info']['data']))
    // logger.debug(process.env.TAGS)
    // const tags = process.env.TAGS ? process.env.TAGS.split(',') : [];
    // console.log(tags)
    // logger.debug(`是否删除本地文件 ${
    //     config.get('UploaderInfo.deleteLocalFile') ? chalk.yellow('是') : chalk.red('否')
    // }`)
    // logger.debug(`是否上传本地文件 ${
    //     config.get('UploaderInfo.uploadLocalFile') ? chalk.yellow('是') : chalk.red('否')
    // }`)
    // if (config.get('UploaderInfo.uploadLocalFile')){
    //     logger.debug('稿件')
    // }
    // console.log(config.get('UploaderInfo.tags'))
    // logger.debug(tags)
    // config.set('UploaderInfo.tags', process.env.TAGS.split(','))
    // const body = await got.post('http://10.0.0.250:3000/process_video', {
    //     json: payload
    // }).json()
    // console.log(body)
    // return new Promise(async (resolve, reject) => {
    //     logger.info('正在获取公钥')
    //     var payload = {}
    //     var url = 'https://passport.bilibili.com/api/oauth2/getKey'
    //     try {
    //         const body = await got.post(url, {
    //             form: sign(payload)
    //         }).json()
    //         if (body.code) reject('公钥获取失败')
    //         logger.notice('公钥获取成功')
    //         resolve(body.data)
    //     } catch (error) {
    //         reject(`An error occurred when getKey: ${error}`)
    //     }
    // })
    // const timeV = dayjs().format("YYYY-MM-DD");
    // let savePath = join(rootPath, "/download")
    // let startNumber = 0;
    // if (!fs.existsSync(savePath)) {
    //     fs.mkdirSync(savePath)
    // }
    // logger.debug(savePath)
    // let dirName = join(savePath, '测试');
    // if (!fs.existsSync(dirName)) {
    //     fs.mkdirSync(dirName)
    // }
    // logger.debug(dirName)
    // dirName = join(dirName, timeV);
    // if (!fs.existsSync(dirName)) {
    //     fs.mkdirSync(dirName)
    // } else {
    //     let ps = fs.readdirSync(dirName);
    //     startNumber = ps.length
    // }
    // logger.debug(startNumber.toString())
    // await uploader(dirName)
    // const downloadFolder = join(rootPath, '/download');
    // if (!fs.existsSync(downloadFolder)) {
    //     fs.mkdirSync(downloadFolder)
    // }
    // const streamerFolders = fs.readdirSync(downloadFolder);
    // streamerFolders.forEach((streamerFolderName) => {
    //     // 获取对应的直播间对象
    //     const roomObj = config.get('UploaderInfo.title') === streamerFolderName
    //     if (!roomObj || !config.get('UploaderInfo.uploadLocalFile')) return
    //     const streamerFolderPath = join(downloadFolder, streamerFolderName)
    //     const videoFolders = fs.readdirSync(streamerFolderPath)
    //     videoFolders.forEach((videoFolderName) => {
    //         const videoFolderPath = join(streamerFolderPath, videoFolderName)
    //         logger.info(`检测到未上传稿件 ${videoFolderPath}，即将上传`)
    //         // 中间文件名
    //         // const newVideoFolderPath = `${videoFolderPath}-intermediate-${Math.random().toString(36).substring(2)}`
    //         // fs.renameSync(videoFolderPath, newVideoFolderPath)
    //         uploader(
    //             videoFolderPath,
    //             `【${streamerFolderName}】${videoFolderName}`
    //         )
    //     })
    // })
    // await SendDingTalk('test')
    // await Notice('test', 'test')
    // await uploader('/Users/liskims/project/BiliBiliLiveTools/download/测试/2021-04-01', `【${config.get('UploaderInfo.title')}】2021-04-01`)
    // let test
    // if (config.get('UploaderInfo.cover')) {
    //     if (fs.statSync(config.get('UploaderInfo.cover')).isFile()) {
    //         test = 1
    //     }
    // }
    // console.log(test)
    // const form = new FormData();
    // form.append('file', fs.createReadStream('/Users/liskims/Downloads/a1e904c5ac9ea09599490c71bd5364264893e24e.jpg'), {
    //     filename: 'cover.png',
    //     contentType: 'image/png'
    // })
    // console.log(form)
    // const body = await got.post('http://member.bilibili.com/x/vu/client/cover/up', {
    //     searchParams: sign({}),
    //     body: form
    // }).json()
    // console.log(body.data.url)
    // 举报评论
    // const payload={
    //     oid:289918520,
    //     type:1,
    //     rpid:4359228794,
    //     reason:4,
    //     csrf: await getCsrf()
    // }
    // const body =await got.post('http://api.bilibili.com/x/v2/reply/report',{})
    // DanMuInfo()
    // await getRoomInfo()
    // logger.debug(new Date())
    process.on('uncaughtException', (error => {
        logger.error(`exception caught: ${error}`)
    }))
    process.on('SIGINT', () => {
        logger.info("Receive exit signal, the process will exit after 3 seconds.")
        logger.info("Process exited by user.")

        setTimeout(() => {
            process.exit()
        }, 3000)
    })
}

test()
//     .then(console.log)
//     .catch(error => {
//     logger.error(error)
// })
