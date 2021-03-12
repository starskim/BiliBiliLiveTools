// const Mirai = require('node-mirai-sdk');
// import * as Live from 'bilibili-live-ws'
// import got from "../utils/got"
// import config from "../utils/config";
// import sleep from "../utils/sleep";
// import {getCsrf} from "../modules/User";
// import auth from "../modules/auth"
// import DanMuInfo from "../modules/DanMuInfo";
import {getRoomInfo} from "../modules/Live";

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
    //
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
    // await DanMuInfo()
    // while (true) {
    //     await auth()
    //     await sleep(1000)
    // }
    await getRoomInfo()

};
test()
