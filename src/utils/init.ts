import config from "./config"

const version = require('../../package.json')

const init = () => {
    if (config.get('version') !== version.version) {
        config.store = {
            version: version.version,
            debug: true,
            bilibiliInfo: {
                uid: '',
                username: '',
                password: '',
                access_token: '',
                refresh_token: '',
            },
            StreamInfo:{
                room_id: '',
            },
            DingTalk: {
                webhook: '',
                secret: ''
            },
        }
    }
    console.log(config.store)
}

export default init
