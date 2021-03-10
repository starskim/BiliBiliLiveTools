const qs = require('qs')
const crypto = require('crypto')
import config from "./config"

//签名
const sign = (data: { access_token?: any; refresh_token?: any; seccode?: string; validate?: string; subid?: number; permission?: string; username?: any; password?: string; captcha?: string; challenge?: string; color?: number; fontsize?: number; mode?: number; msg?: string; rnd?: number; roomid?: any; csrf?: string; csrf_token?: string; sign?: any }) => {

    const appkey = 'aae92bc66f3edfab'
    const appsecret = 'af125a0d5279fd576c1b4418a3e8276d'

    const defaults = {
        access_key: config.get('bilibiliInfo.access_token', ''),
        appkey,
        platform: 'pc',
        ts: Date.now(),
    };

    data = {
        ...defaults,
        ...data
    }

    let hash = qs.stringify(data, {sort: (a: string, b: any) => a.localeCompare(b)});
    hash = crypto.createHash('md5').update(hash+appsecret).digest('hex')

    data.sign = hash

    return data
}

export default sign
