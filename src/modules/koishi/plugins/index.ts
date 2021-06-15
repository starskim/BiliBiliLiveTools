import {Context} from 'koishi'

export const name = 'BiliLiveTools'

export const apply = (ctx: Context) => {
    ctx.middleware((session, next) => {
        if (session.content === '天王盖地虎') {
            session.send('宝塔镇河妖')
        }
        return next()
    })
};
