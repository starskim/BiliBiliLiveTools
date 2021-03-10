import config from "../utils/config";
import got from "../utils/got";

let payload;

//获取直播间信息
export const getRoomId = async () => {
    payload = {
        id: config.get('room_id')
    }
    const body = await got.get('https://api.live.bilibili.com/room/v1/Room/room_init', {
        searchParams: payload
    }).json()

    return body
}
