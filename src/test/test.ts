// const Mirai = require('node-mirai-sdk');


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

};
test()
