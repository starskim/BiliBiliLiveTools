import got from "../utils/got"
import config from "../utils/config"
import sign from "../utils/sign"

let payload;

//获取直播间信息
const getRoomInfo = async () => {
    payload = {
        id: config.get('StreamInfo.room_id')
    }
    const body = await got.get('https://api.live.bilibili.com/room/v1/Room/get_info', {searchParams: sign(payload)}).json()
    // 直播短号转长号
    if (body.data.room_id !== config.get('StreamInfo.room_id')) config.set('StreamInfo.room_id', body.data.room_id)
    if (body.data.uid !== config.get('StreamInfo.uid')) config.set('StreamInfo.uid', body.data.uid)
}

export {
    getRoomInfo
}
