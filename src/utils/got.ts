const got = require('got')
import config from "../utils/config"

const logger = require('../utils/logger').logger('Got')

const CookieStore = require('tough-cookie-file-store').FileCookieStore
const CookieJar = require('tough-cookie').CookieJar

const cookieJar = new CookieJar(new CookieStore('./conf/cookie.json'))

const _got = got.extend({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'zh-cn',
        // 'Connection': 'keep-alive',
        // 'Referer': `https://live.bilibili.com/${config.get('room_id')}`,
    },

    cookieJar,
    timeout: 20000,
    hooks: {
        beforeRequest: [
            (options: { headers: any; method: any; url: any; }) => {
                if (config.get('debug')) {
                    // logger.debug(options.headers)
                    logger.debug(`${options.method} ${options.url}`)
                }
            }
        ],
        afterResponse: [
            (response: { rawBody: string | any[]; }) => {
                if (config.get('debug') && response.rawBody.length < 1000) logger.debug(Buffer.from(response.rawBody).toString())
                return response
            }
        ]
    },
})

export default _got
