import got from "../../utils/got";
import * as fs from "fs";

const logger = require('../../utils/logger').logger('Uploader')
let _auto_os: any

const user_weight = async () => {
    const {data: {myinfo}} = await got.get('https://member.bilibili.com/x/web/archive/pre?lang=cn').json()
    const {data} = await got.get('https://member.bilibili.com/x/web/index/stat').json()
    myinfo.total_info = data
    let user_weight
    if (myinfo.level > 3 && myinfo.total_info && myinfo.total_info.total_fans > 100) {
        user_weight = 2
    } else {
        user_weight = 1
    }
    if (user_weight == 2) {
        logger.info(`用户权重: ${user_weight} => 网页端分p数量不受限制使用网页端api提交`)
    }
    logger.info(`用户权重: ${user_weight} => 网页端分p数量受到限制使用客户端api端提交`)
}

const probe = async () => {
    const {lines} = await got.get('https://member.bilibili.com/preupload?r=probe').json()
    logger.info(`线路:${JSON.stringify(lines)}`)
    let auto_os, data, line
    let min_cost = 0
    data = Buffer.from(`${parseInt(String(1024 * 0.1 * 1024))}`)
    for (line in lines) {
        const start = +new Date()
        const test = await got.post(`https:${lines[line].probe_url}`, {
            form: {data}
        })
        const cost = (+new Date() - start) / 1000
        logger.info(`${lines[line].query} ${cost}`)
        if (test.statusCode != 200) return
        if (!min_cost || min_cost > cost) {
            auto_os = lines[line]
            min_cost = cost
        }
    }
    auto_os.cost = min_cost
    return auto_os
}

const upload_file = async (lines = 'AUTO') => {
    if (!_auto_os) {
        _auto_os = await probe()
        if (lines == 'kodo') {
            _auto_os = {
                "os": "kodo", "query": "bucket=bvcupcdnkodobm&probe_version=20200810",
                "probe_url": "//up-na0.qbox.me/crossdomain.xml"
            }
        }
        if (lines == 'bda2') {
            _auto_os = {
                "os": "upos", "query": "upcdn=bda2&probe_version=20200810",
                "probe_url": "//upos-sz-upcdnbda2.bilivideo.com/OK"
            }
        }
        if (lines == 'ws') {
            _auto_os = {
                "os": "upos", "query": "upcdn=ws&probe_version=20200810",
                "probe_url": "//upos-sz-upcdnws.bilivideo.com/OK"
            }
        }
        if (lines == 'qn') {
            _auto_os = {
                "os": "upos", "query": "upcdn=qn&probe_version=20200810",
                "probe_url": "//upos-sz-upcdnqn.bilivideo.com/OK"
            }
        }
        logger.info(`线路选择${_auto_os.os}: ${_auto_os.query}. time: ${_auto_os.cost}`)
    }
    let upload
    if (_auto_os.os == 'upos') {
        upload = 'upos'
    } else if (_auto_os.os == 'kodo') {
        upload = 'kodo'
    } else if (_auto_os.os == 'gcs') {
        upload = 'gcs'
    } else if (_auto_os.os == 'bos') {
        upload = 'bos'
    } else {
        logger.error(`NoSearch:${_auto_os.os}`)
    }
    logger.debug(upload)
    // total_size = fs.statSync(local_file_namelocal_file_name).size
    const total_size = fs.statSync('/Volumes/Record/bilibili_record/54897-Ruriko琉璃子Channel/20210324/06P.mp4').size
    logger.debug(total_size)
}

//远行
const main = async () => {
    await user_weight()
    await upload_file()
}

export default () => {
    return main()
}
