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
            DingTalk: {
                webhook: process.env.DingTalkWebhook || '',
                secret: process.env.DingTalksecret || ''
            },
        }
    }
    console.log(config.store)
}

export default init
