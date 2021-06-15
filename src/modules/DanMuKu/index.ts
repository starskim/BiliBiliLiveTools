import {KeepLiveTCP} from 'bilibili-live-ws/src'
import * as type from 'typedi'
import config from "utils/config"
import processing from "./process"

const logger = require('utils/logger').logger('DanMuInfo')

//远行
export default () => {
    const live = new KeepLiveTCP(config.get('StreamInfo.room_id'))
    let online = 0
    type.Container.set(KeepLiveTCP, live)
    live.on('live', () => logger.connectToLiveRoom('ok', config.get('StreamInfo.room_id'), config.get('StreamInfo.uid')))
    live.on('heartbeat', msg => online = msg)
    live.on('msg', async msg => {
        await processing(msg, online)
    })
    live.on('error', (e) => logger.error(e))
    process.on("SIGINT", () => {
        live.close()
    })
}
