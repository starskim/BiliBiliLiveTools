import config from "./config"

const version = require('../../package.json')
let envs = process.env

const init = () => {
    if (config.get('version') !== version.version) {
        config.store = {
            version: version.version,
            debug: envs.DEBUG === 'true',
            bilibiliInfo: {
                uid: '',
                username: envs.USERNAME || '',
                password: envs.PASSWORD || '',
                access_token: envs.ACCESS_TOKEN || '',
                refresh_token: envs.REFRESH_TOKEN || '',
            },
            StreamInfo: {
                uid: '',
                room_id: envs.ROOM_ID || '',
            },
            UploaderInfo: {
                uploadLocalFile: envs.UPLOADLOCALFILE || true,
                deleteLocalFile: envs.DELETELOCALFILE || false,
                videoPartLimitSize: envs.VIDEOPARTLIMITSIZE || 100,
                copyright: envs.COPYRIGHT || 2,
                title: envs.TITLE || '',
                tid: envs.TID || 27,
                tags: envs.TAGS ? envs.TAGS.split(',') : ['录播', '直播录像'],
                desc: envs.DESC || '',
                cover: envs.COVER || '',
                no_reprint: envs.NO_REPRINT || 1,
                open_elec: envs.OPEN_ELEC || 0
            },
            DingTalk: {
                webhook: envs.DINGTALKWEBHOOK || '',
                secret: envs.DINGTALKSECRET || '',
            },
        }
    }
    console.log(config.store)
}

export default init
