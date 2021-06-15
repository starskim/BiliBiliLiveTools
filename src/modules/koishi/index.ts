import 'koishi-adapter-onebot'
import * as chalk from 'chalk'
import {App, AppConfig, version} from "koishi"
import config from "utils/config"
const logger = require('utils/logger').logger('Bot')

const configs: AppConfig = {
    port: config.get('koishi.port'),
    type: 'onebot',
    server: config.get('koishi.server'),
    selfId: config.get('koishi.selfId'),
    token: config.get('koishi.token'),

}

const app = new App(configs)

app
    .plugin(require('koishi-plugin-mysql'), {
        host: '127.0.0.1',
        // Koishi 服务器监听的端口
        port: 3306,
        user: 'root',
        password: 'C60Sp!s)',
        database: 'koishi',
    })
    .plugin(require('koishi-plugin-common'))
    .plugin(require('koishi-plugin-webui'))
    .plugin(require('./plugins'))

//远行
const main = () => {
    app.start().then(() => {
        // app.bots[0].sendPrivateMessage('3234711494','test')
        logger.info(`Koishi/${version}`)
        app.bots.forEach((bot: any) => {
            logger.info(`logged in to ${bot.platform} as ${chalk.green(bot.username)} (${bot.selfId})`)
        })
    })
}

export default () => {
    main()
}
