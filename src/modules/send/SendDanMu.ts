import got from "../../utils/got";
import sign from "../../utils/sign";
import {getCsrf} from '../user'
import config from "../../utils/config";

const logger = require('../../utils/logger').logger('SendDanMu')

let payload;

const sendMsg = async (content: any) => {

    const user_info = await getCsrf();

    payload = {
        color: 16777215,
        fontsize: 25,
        mode: 1,
        msg: content,
        rnd: 0,
        roomid: config.get('StreamInfo.room_id'),
        csrf: user_info,
        csrf_token: user_info,
    };
    const body = await got.post('https://api.live.bilibili.com/msg/send', {
        form: sign(payload)
    }).json()

    return body
}

const privateSendMsg = async (content: string) => {
    const response = await sendMsg(content)
    if (response.code == 0) {
        logger.info('弹幕发送成功!')
    } else {
        logger.warn(`弹幕发送失败, CODE -> ${response.code} MSG -> ${response.msg} "`)
    }
}

const main = async (content: string) => {
    await privateSendMsg(content)
}

export default (content: string) => {
    return main(content)
        .catch(error => logger.error(error.message))
}

