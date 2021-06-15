import config from "./config"

const version = require('../../package.json')
let envs = process.env

const init = () => {
    if (config.get('version') !== version.version) {
        config.store = {
            version: version.version,
            debug: envs.DEBUG || false,
            Use_Proxy: envs.USE_PROXY || false,
            Network_Proxy: envs.NETWORK_PROXY || 'http://127.0.0.1:6152',
            connect: {
                listenInaddrAny: envs.CONNECT_LISTEN_INADDR_ANY || 1,
                port: envs.CONNECT_PORT || 3000
            },
            koishi: {
                port: envs.KOISHI_PORT || 3001,
                server: envs.KOISHI_SERVER || '',
                selfId: envs.KOISHI_SELFID || '',
                token: envs.KOISHI_TOKEN || ''
            },
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
                deleteLocalFile: envs.DELETELOCALFILE || true,
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
            Notice: {
                Use_Notice: envs.USE_NOTIFY || false,
                SctKey: envs.NOTIFY_SCTKEY || '',
                ScKey: envs.NOTIFY_SCKEY || '',
                Tele: {
                    BotToken: envs.NOTIFY_TELE_BOTTOKEN || '',
                    ChatId: envs.NOTIFY_TELE_CHATID || ''
                },
                DingTalk: {
                    Token: envs.NOTIFY_DINGTALK_TOKEN || '',
                    Secret: envs.NOTIFY_DINGTALK_SECRET || '',
                },
                PushPlus: {
                    Token: envs.NOTIFY_PUSHPLUS_TOKEN || ''
                },
                Cq: {
                    Url: envs.NOTIFY_CQ_URL || '',
                    Token: envs.NOTIFY_CQ_TOKEN || '',
                    QQ: envs.NOTIFY_CQ_QQ || ''
                }
            },
        }
    }
    console.log(config.store)
}

export default init
