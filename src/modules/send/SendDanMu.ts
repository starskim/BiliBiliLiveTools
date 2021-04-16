import got from "../../utils/got";
import sign from "../../utils/sign";
import {getCsrf} from '../User'
import config from "../../utils/config";

const logger = require('../../utils/logger').logger('SendDanMu')

let payload;

const sendMsg = async (content: any) => {

    const user_info = await getCsrf();

    payload = {
        bubble: 0,
        msg: content,
        color: 16777215,
        mode: 1,
        fontsize: 25,
        rnd: Date.now(),
        roomid: config.get('StreamInfo.room_id'),
        csrf: user_info,
        csrf_token: user_info,
    }
    
    return got.post('https://api.live.bilibili.com/msg/send', {
        form: sign(payload)
    }).json()
}

const privateSendMsg = async (content: string) => {
    const response = await sendMsg(content)
    if (response.code == 0) {
        logger.info('弹幕发送成功!')
    } else {
        logger.warning(`弹幕发送失败, CODE -> ${response.code} MSG -> ${response.msg} "`)
    }
}

const main = async (content: string) => {
    await privateSendMsg(content)
}

export default (content: string) => {
    return main(content)
}

