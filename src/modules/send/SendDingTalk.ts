import got from "../../utils/got"
import config from "../../utils/config"
import * as crypto from 'crypto'

const logger = require('../../utils/logger').logger('SendDingTalk')

let payload;

const sendMsg = async (content: string) => {
    const timestamp = Date.now()
    const hmac = encodeURIComponent(crypto.createHmac('sha256', config.get('DingTalk.secret')).update(`${timestamp}\n${config.get('DingTalk.secret')}`).digest('base64'))

    payload = {
        msgtype: "text",
        text: {content}
    }
    return got.post(`${config.get('DingTalk.webhook')}&timestamp=${timestamp}&sign=${hmac}`, {
        json: payload
    }).json();
}
const privateSendMsg = async (content: string) => {
    const response = await sendMsg(content)
    if (response.errcode == 0) {
        logger.info('钉钉推送成功!')
    } else {
        logger.warning(`钉钉推送失败, CODE -> ${response.errcode} MSG -> ${response.errmsg} "`)
    }
}

const main = async (content: string) => {
    await privateSendMsg(content)
}

export default (content: string) => {
    return main(content)
        .catch(error => {
            logger.error(error.message)
        })
}
