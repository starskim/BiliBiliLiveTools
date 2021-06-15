import config from "utils/config"
import got from "utils/got"
import * as crypto from 'crypto'
import * as dayjs from 'dayjs'

const logger = require('utils/logger').logger('Notice')
let url
let payload

export default async (type: string, result: string) => {
    if (config.get('Notice.Use_Notice') == false) return
    await sendInfoHandle(type, result)
}

const sendInfoHandle = async (type: string, result: string) => {
    const now_time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    let info: any
    switch (type) {
        case 'LIVE':
            info = {
                title: '直播开始',
                content: `[${now_time}] 直播间${result}：开播了！！！`
            }
            break
        case 'PREPARING':
            info = {
                title: '直播结束',
                content: `[${now_time}] 直播间${result}：下播了`
            }
            break
        case 'DAN_MU_WARNING':
            info = {
                title:'超管警告',
                content: `[${now_time}] 超管警告：${result}`
            }
            break
        case 'CUT_OFF':
            info = {
                title:'超管切断直播',
                content: `[${now_time}] 超管切断直播：${result}`
            }
            break
        default:
            info = {
                title: '推送消息异常记录',
                content: `[${now_time}] 推送消息key错误: ${type}->${result}`
            }
            break
    }

    await sendLog(info)
}

const sendLog = async (info: any) => {
    if (config.get('Notice.SctKey')) {
        await sctSend(info)
    }
    if (config.get('Notice.ScKey')) {
        await scSend(info)
    }
    if (config.get('Notice.Tele.BotToken') && config.get('Notice.Tele.ChatId')) {
        await teleSend(info)
    }
    if (config.get('Notice.DingTalk.Token') && config.get('Notice.DingTalk.Secret')) {
        await dingTalkSend(info)
    }
    if (config.get('Notice.PushPlus.Token')) {
        await pushPlusSend(info)
    }
    if (config.get('Notice.Cq.Url') && config.get('Notice.Cq.Token') && config.get('Notice.Cq.QQ')) {
        await goCqhttp(info)
    }
}

// DingTalkbot推送
const dingTalkSend = async (info: any) => {
    logger.info('使用DingTalk机器人推送消息')
    url = 'https://oapi.dingtalk.com/robot/send'
    payload = {
        msgtype: "markdown",
        markdown: {
            title: info.title,
            text: info.content
        }
    }
    const timestamp = Date.now()
    const sign = encodeURIComponent(crypto.createHmac('sha256', config.get('Notice.DingTalk.Secret')).update(`${timestamp}\n${config.get('Notice.DingTalk.Secret')}`).digest('base64'))
    const raw = await got.post(url, {
        searchParams: {
            access_token: config.get('Notice.DingTalk.Token'),
            timestamp,
            sign
        },
        json: payload
    }).json()

    if (raw.errcode == 0) {
        logger.info(`推送消息成功: ${raw.errmsg}`)
    } else {
        logger.warning(`推送消息失败: ${JSON.stringify(raw)}`)
    }
}

// TeleBot推送
const teleSend = async (info: any) => {
    logger.info('使用Tele机器人推送消息')
    url = `https://api.telegram.org/bot${config.get('Notice.Tele.BotToken')}/sendMessage`
    payload = {
        chat_id: config.get('Notice.Tele.ChatId'),
        text: info.content
    }
    const raw = await got.post(url, {
        form: payload
    }).json()

    if (raw.result.message_id) {
        logger.info(`推送消息成功: ${raw.result.message_id}`)
    } else {
        logger.warning(`推送消息失败: ${JSON.stringify(raw)}`)
    }
}

// ServerChan推送
const scSend = async (info: any) => {
    logger.info('使用ServerChan推送消息')
    url = `https://sc.ftqq.com/${config.get('Notice.ScKey')}.send`
    payload = {
        text: info.title,
        desp: info.content
    }
    const raw = await got.post(url, {
        form: payload
    }).json()

    if (raw.errno == 0) {
        logger.info(`推送消息成功: ${raw.errmsg}`)
    } else {
        logger.warning(`推送消息失败: ${JSON.stringify(raw)}`)
    }
}

// ServerChan(Turbo)推送
const sctSend = async (info: any) => {
    logger.info('使用ServerChan(Turbo)推送消息')
    url = `https://sctapi.ftqq.com/${config.get('Notice.SctKey')}.send`
    payload = {
        text: info.title,
        desp: info.content
    }
    const raw = await got.post(url, {
        form: payload
    }).json()
    if (raw.code == 0) {
        logger.info(`推送消息成功: ${raw.data.pushid}`)
    } else {
        logger.warning(`推送消息失败: ${JSON.stringify(raw)}`)
    }
}

// PushPlus酱推送
const pushPlusSend = async (info: any) => {
    logger.info('使用PushPlus酱推送消息')
    url = 'http://www.pushplus.plus/send'
    payload = {
        token: config.get('Notice.PushPlus.Token'),
        title: info.title,
        content: info.content
    }
    const raw = await got.post(url, {
        json: payload
    }).json()
    if (raw.code == 200) {
        logger.info(`推送消息成功: ${raw.data}`)
    } else {
        logger.warning(`推送消息失败: ${JSON.stringify(raw)}`)
    }
}

// GO-CQHTTP推送
const goCqhttp = async (info: any) => {
    logger.info('使用GoCqhttp推送消息')
    url = config.get('Notice.Cq.Url')
    payload = {
        access_token: config.get('Notice.Cq.Token'),
        user_id: config.get('Notice.Cq.QQ'),
        message: info.content
    }
    const raw = await got.post(url, {
        searchParams: payload
    }).json()
    if (raw.retcode == 0) {
        logger.info(`推送消息成功: ${raw.status}`)
    } else {
        logger.warning(`推送消息失败: ${JSON.stringify(raw)}`)
    }
}
