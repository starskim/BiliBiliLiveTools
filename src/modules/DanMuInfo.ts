import * as Live from 'bilibili-live-ws'
import config from "../utils/config"

const colors = require('colors')
const logger = require('../utils/logger').logger('DanMuInfo')

//远行
const main = async () => {
    const live = new Live.KeepLiveTCP(config.get('StreamInfo.room_id'))
    live.on('live', () => logger.info(colors.brightGreen('连接到直播间') + colors.brightRed(config.get('StreamInfo.room_id'))))
}

export default () => {
    return main()
}
