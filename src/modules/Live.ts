import got from "../utils/got"
import config from "../utils/config"
import sign from "../utils/sign"
import DanMuInfo from "./DanMuKu";


const logger = require('../utils/logger').logger('Live')

let payload;

//检查直播房间号
const checkRoomId = async () => {
    logger.info('检查直播房间号')
    const room_id = config.get('StreamInfo.room_id')
    if (room_id === "") {
        throw new Error('空白直播房间号')
    }
    await getRoomInfo()
}

//获取直播间信息
const getRoomInfo = async () => {
    payload = {
        id: config.get('StreamInfo.room_id')
    }
    const body = await got.get('https://api.live.bilibili.com/room/v1/Room/get_info', {searchParams: sign(payload)}).json()
    // 直播短号转长号
    if (body.data.room_id !== config.get('StreamInfo.room_id')) config.set('StreamInfo.room_id', body.data.room_id)
    if (body.data.uid !== config.get('StreamInfo.uid')) config.set('StreamInfo.uid', body.data.uid)
    DanMuInfo()
}

export default () => {
    checkRoomId().catch(error => logger.error(error.message))
}
