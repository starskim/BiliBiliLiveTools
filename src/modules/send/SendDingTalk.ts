import got from "../../utils/got"
import config from "../../utils/config";

const crypto = require('crypto');
const logger = require('../../utils/logger').logger('SendDingTalk')

let payload;

const sendMsg = async (content: any) => {
    const timestamp = Date.now()
    const sing = config.get('DingTalk.secret')
    const hmac = encodeURIComponent(crypto.createHmac('sha256', sing).update(`${timestamp}\n${sing}`).digest('base64'))

    payload = {
        msgtype: "text",
        text: {content}
    }
    const body = await got.post(`${config.get('DingTalk.webhook')}&timestamp=${timestamp}&sign=${hmac}`, {
        json: payload
    }).json()
    return body
}
const privateSendMsg = async (content: string) => {
    const response = await sendMsg(content)
    if (response.errcode == 0) {
        logger.info('钉钉推送成功!')
    } else {
        logger.warn(`钉钉推送失败, CODE -> ${response.errcode} MSG -> ${response.errmsg} "`)
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
