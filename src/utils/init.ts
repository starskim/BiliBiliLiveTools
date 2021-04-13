import config from "./config"

const version = require('../../package.json')

const init = () => {
    if (config.get('version') !== version.version) {
        config.store = {
            version: version.version,
            debug: process.env.DEBUG === 'true',
            bilibiliInfo: {
                uid: '',
                username: process.env.USERNAME || '',
                password: process.env.PASSWORD || '',
                access_token: process.env.ACCESS_TOKEN || '',
                refresh_token: process.env.REFRESH_TOKEN || '',
            },
            StreamInfo: {
                uid: '',
                room_id: process.env.ROOM_ID || '',
            },
            UploaderInfo: {
                uploadLocalFile: process.env.UPLOADLOCALFILE || true,
                deleteLocalFile: process.env.DELETELOCALFILE || false,
                videoPartLimitSize: process.env.VIDEOPARTLIMITSIZE || 100,
                copyright: process.env.COPYRIGHT || 2,
                title: process.env.TITLE || '',
                tid: process.env.TID || 27,
                tags: process.env.TAGS ? process.env.TAGS.split(',') : ['录播', '直播录像'],
                desc: process.env.DESC || '',
                no_reprint: process.env.NO_REPRINT || 1,
                open_elec: process.env.OPEN_ELEC || 0
            },
            DingTalk: {
                webhook: process.env.DINGTALKWEBHOOK || '',
                secret: process.env.DINGTALKSECRET || '',
            },
        }
    }
    console.log(config.store)
}

export default init
