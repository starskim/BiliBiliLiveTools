const got = require('got')
import * as chalk from 'chalk'

const logger = require('../utils/logger').logger('Got')

const CookieStore = require('tough-cookie-file-store').FileCookieStore
const CookieJar = require('tough-cookie').CookieJar

const cookieJar = new CookieJar(new CookieStore('./conf/cookie.json'))

const _got = got.extend({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'zh-cn',
        'Connection': 'keep-alive',
        // 'Referer': `https://live.bilibili.com/${config.get('room_id')}`,
    },

    cookieJar,
    timeout: 20000,
    hooks: {
        beforeRequest: [
            (options: { headers: any; method: any; url: any; }) => {
                // logger.debug(JSON.stringify(options.headers))
                logger.debug(`${chalk.cyan(options.method)} ${chalk.yellow(options.url)}`)
            }
        ],
        afterResponse: [
            (response: { body: string | any[]; }) => {
                if (response.body.length < 1000) logger.debug(chalk.gray(response.body))
                return response
            }
        ]
    },
})

export default _got
