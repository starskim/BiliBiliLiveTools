import got from "./got";
import config from "./config";
import * as fs from "fs"
import {join} from 'path'
import {EventEmitter} from "events"

const getCsrf = async () => {
    const cookies = got.defaults.options.cookieJar.getCookiesSync('https://api.bilibili.com/')
    for (const cookie of cookies) {
        const found = `${cookie}`.match(/bili_jct=(.{32})/)
        if (found) {
            return found[1]
        }
    }
    throw new Error('guard: csrf 提取失败')
}

const getRoomInfo = async () => {
    const room_id = config.get('StreamInfo.room_id')
    if (!room_id) {
        throw new Error('空白直播房间号')
    }
    const payload = {
        id: room_id
    }
    const body = await got.get('https://api.live.bilibili.com/room/v1/Room/get_info', {searchParams: payload}).json()
    // 直播短号转长号
    if (body.data.room_id !== config.get('StreamInfo.room_id')) config.set('StreamInfo.room_id', body.data.room_id)
    if (body.data.uid !== config.get('StreamInfo.uid')) config.set('StreamInfo.uid', body.data.uid)
}

const deleteFolder = (path: string) => {
    try {
        if (fs.existsSync(path)) {
            const files = fs.readdirSync(path);
            files.forEach((file) => {
                const curPath = join(path, file)
                if (!fs.statSync(curPath).isDirectory()) {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    } catch (err) {
        throw err
    }
}
const emitter = new EventEmitter()

export {
    getCsrf,
    getRoomInfo,
    deleteFolder,
    emitter
}
