import * as crypto from 'crypto'
import got from 'utils/got'
import share from "utils/share"
import sign from "utils/sign"
import config from "utils/config"
import * as dayjs from 'dayjs'

const logger = require('utils/logger').logger('Auth')

let payload

//检查 Token 是否过期
const checkToken = async () => {
    logger.info('检查 Token 是否过期')

    payload = {
        access_token: config.get('bilibiliInfo.access_token', ''),
    }
    const {code, ts, data} = await got.get('https://passport.bilibili.com/api/v2/oauth2/info', {
        searchParams: sign(payload)
    }).json()

    logger.info(`令牌有效期: ${dayjs.unix(ts + data.expires_in).format('YYYY-MM-DD HH:mm:ss')}`)

    if (code || data.expires_in < 14400) {
        logger.warning('检测到 Token 需要更新')

        const status = await refreshToken()
        if (!status) await checkLogin()
    }
}

//刷新 Token
const refreshToken = async () => {

    if (config.get('bilibiliInfo.refresh_token', '') === '') return false

    logger.info('正在刷新 Token')

    payload = {
        access_token: config.get('bilibiliInfo.access_token'),
        refresh_token: config.get('bilibiliInfo.refresh_token'),
    };
    const {
        code,
        data: {access_token, refresh_token}
    } = await got.post('https://passport.bilibili.com/api/oauth2/refreshToken', {
        form: sign(payload)
    }).json()

    if (code) {
        config.set('bilibiliInfo.access_token', '')
        config.set('bilibiliInfo.refresh_token', '')
        return false
    }
    logger.notice('Token 刷新成功')
    config.set('bilibiliInfo.access_token', access_token)
    config.set('bilibiliInfo.refresh_token', refresh_token)
    return true
}

//检查登录
const checkLogin = async () => {
    logger.info('检查登录')
    const user = config.get('bilibiliInfo.username')
    const pass = config.get('bilibiliInfo.password')
    if (!user || !pass) throw new Error('空白的帐号和口令')
    await loginPassword()
}

// 账密登录
const loginPassword = async () => {
    const {hash, key} = await getPublicKey()

    logger.info('正在尝试使用用户名、密码登录')

    const username = config.get('bilibiliInfo.username');
    const password = crypto.publicEncrypt(
        {
            key,
            padding: 1,
        },
        Buffer.from(`${hash}${config.get('bilibiliInfo.password')}`) // eslint-disable-line
    ).toString('base64');

    payload = {
        seccode: '',
        validate: '',
        subid: 1,
        permission: 'ALL',
        username,
        password,
        captcha: '',
        challenge: '',
    }

    const {
        code,
        data: {status, token_info: {access_token, refresh_token}}
    } = await got.post('https://passport.bilibili.com/api/v3/oauth2/login', {
        form: sign(payload),
    }).json()

    if (code || status) throw new Error('登录失败')
    logger.info('登录成功')

    config.set('bilibiliInfo.access_token', access_token)
    config.set('bilibiliInfo.refresh_token', refresh_token)
}

//获取公钥
const getPublicKey = async () => {
    logger.info('正在获取公钥')

    payload = {};
    const {code, data} = await got.post('https://passport.bilibili.com/api/oauth2/getKey', {
        form: sign(payload)
    }).json()

    if (code) throw new Error('公钥获取失败')
    logger.notice('公钥获取成功')
    return data
}

//检查 Cookie 是否过期
const checkCookie = async () => {
    logger.info('检查 Cookie 是否过期')

    const code = await getUserInfo();

    if (code !== 'REPONSE_OK') {
        logger.warning('检测到 Cookie 已经过期')
        logger.info('正在刷新 Cookie')
        await got.get('https://passport.bilibili.com/api/login/sso', {searchParams: sign({})})
        logger.notice('Cookie 刷新成功')
        await getUserInfo() // 获取UID，舰长经验检测有用到
    }
}

//获取用户信息
const getUserInfo = async () => {
    const {code, data: {uid}} = await got.get('https://api.live.bilibili.com/User/getUserInfo', {
        searchParams: {
            ts: Math.round(Date.now() / 1000)
        }
    }).json()

    // 获取UID
    if (code === 'REPONSE_OK') config.set('bilibiliInfo.uid', uid)

    return code
}


//远行
const main = async () => {
    await checkToken()
    await checkCookie()
}

export default () => {
    if (share.auth.lock > Date.now()) return
    return main()
        .then(() => share.auth.lock = Date.now() + 60 * 60 * 1000)
        .catch(error => {
            logger.error(error.message)
            share.auth.lock = Date.now() + 10 * 60 * 1000
        })
}
