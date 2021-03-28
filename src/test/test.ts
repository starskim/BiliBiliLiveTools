// const Mirai = require('node-mirai-sdk');
// const crypto = require('crypto')
// import * as Live from 'bilibili-live-ws'
// import got from "../utils/got"
// import sign from "../utils/sign"
import config from "../utils/config"
// import sleep from "../utils/sleep"
// import {getCsrf} from "../modules/User"
// import auth from "../modules/auth"
// import Live from "../modules/Live"
import * as fs from "fs"
// import auth from "../modules/Auth"
// import uploader from "../modules/uploader"
import * as chalk from 'chalk'

const logger = require('../utils/logger').logger('测试')

// const bot = new Mirai({
//     host: 'http://10.0.0.252:8081',
//     authKey: 'INITKEY8oqXaf7G',
//     qq: 3517974099,
//     enableWebsocket: true,
// });

// auth 认证(*)
// bot.onSignal('authed', () => {
//     console.log(`Authed with session key ${bot.sessionKey}`);
//     bot.verify();
// });

// session 校验回调
// bot.onSignal('verified', async () => {
//     console.log(`Verified with session key ${bot.sessionKey}`);
//
//     // 获取好友列表，需要等待 session 校验之后 (verified) 才能调用 SDK 中的主动接口
//     const friendList = await bot.getFriendList();
//     console.log(`There are ${friendList.length} friends in bot`);
//     bot.sendGroupMessage('测试', 778666825)
// });


const test = async () => {
    logger.debug('测试')
    // await auth()
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
    let fileSize = fs.statSync(`/Volumes/Record/bilibili_record/54897-Ruriko琉璃子Channel/20210324/06P.mp4`).size
    // const chunkSize = 5 * 1024 * 1024 //每 chunk 5M
    // const chunkNum = Math.ceil(fileSize / chunkSize)
    logger.debug(fileSize)
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
    logger.debug(process.env.TAGS)
    const tags = process.env.TAGS ? process.env.TAGS.split(',') : [];
    console.log(tags)
    logger.debug(`是否删除本地文件 ${
        config.get('UploaderInfo.deleteLocalFile') ? chalk.yellow('是') : chalk.red('否')
    }`)
    logger.debug(`是否上传本地文件 ${
        config.get('UploaderInfo.uploadLocalFile') ? chalk.yellow('是') : chalk.red('否')
    }`)
    if (config.get('UploaderInfo.uploadLocalFile')){
        logger.debug('稿件')
    }
    console.log(config.get('UploaderInfo.tags'))
    // logger.debug(tags)
    // config.set('UploaderInfo.tags', process.env.TAGS.split(','))
    // await uploader()

};
test()
