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
                name: process.env.UNAME || '',
                lines: process.env.LINES || "AUTO",
                threads: process.env.THREADS || 3,
                uploadLocalFile: process.env.UPLOADLOCALFILE || true,
                deleteLocalFile: process.env.DELETELOCALFILE || false,
                videoPartLimitSize: process.env.VIDEOPARTLIMITSIZE || 100,
                tid: process.env.TID || 27,
                tags: process.env.TAGS ? process.env.TAGS.split(',') : [],
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
