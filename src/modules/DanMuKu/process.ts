import SendDingTalk from "../send/SendDingTalk";

const logger = require('../../utils/logger').Danmu()
const logger1 = require('../../utils/logger').logger('DanMu_Debug')

const main = async (msg: any, online: any) => {
    let UserName
    let isAdmin
    let GiftName
    let GiftCount
    let UserGuardLevel
    let CommentText
    switch (msg.cmd) {
        case 'LIVE':
            // 直播开始
            await SendDingTalk(`${msg.roomid} 开播了！！！！`)
            await SendDingTalk(`${msg.roomid} 开播了！！！！`)
            await SendDingTalk(`${msg.roomid} 开播了！！！！`)
            break
        case 'PREPARING':
            // 直播结束
            await SendDingTalk(`${msg.roomid} 下播了`)
            break
        case 'DANMU_MSG':
            // 用户发送弹幕
            isAdmin = msg.info[2][2] == 1
            const isVIP = msg.info[2][3] == 1
            UserName = msg.info[2][1]
            CommentText = msg.info[1]
            logger.Comment(isAdmin, isVIP, UserName, CommentText)
            break
        case 'SEND_GIFT':
        case 'COMBO_SEND':
            // 礼物发送消息
            GiftName = msg.data.giftName || msg.data.gift_name
            UserName = msg.data.uname
            GiftCount = msg.data.num || msg.data.batch_combo_num
            logger.GiftSend(UserName, GiftName, GiftCount)
            break
        case 'ANCHOR_LOT_START':
            // 天选抽奖开始
            logger1.debug(JSON.stringify(msg))
            GiftName = msg.data.award_name
            GiftCount = msg.data.award_num
            logger.AnchorLotStart(GiftName, GiftCount)
            break
        case 'ANCHOR_LOT_END':
            // 天选抽奖结束
            logger.AnchorLotEnd()
            logger1.debug(JSON.stringify(msg))
            break
        case 'NOTICE_MSG':
            // 全区公告
            CommentText = msg.msg_common
            logger.NoticeMsg(CommentText)
            break
        case 'ROOM_REAL_TIME_MESSAGE_UPDATE':
            // 房间实时消息更新
            logger.RoomRealTimeMessage(msg.data.fans, msg.data.fans_club, online)
            break
        case 'ONLINE_RANK_COUNT':
            // 高能榜
            logger.OnlineRankCount(msg.data.count)
            break
        case 'ONLINE_RANK_V2':
            // 高能榜更新
            break
        case 'ONLINE_RANK_TOP3':
            // 高能榜前三
            break
        case 'HOT_RANK_CHANGED':
            // 热门榜
            const area_name = msg.data.area_name
            const rank = msg.data.rank
            logger.HotRankChanged(area_name, rank)
            break
        case 'WELCOME':
            // 老爷进入信息
            UserName = msg.data.username
            isAdmin = msg.data.isadmin == 1
            logger.Welcome(isAdmin, UserName)
            break
        case 'WELCOME_GUARD':
            // 舰长进入信息1
            UserName = msg.data.username
            UserGuardLevel = msg.data.guard_level
            logger.WelcomeGuard(UserGuardLevel, UserName)
            break
        case 'ENTRY_EFFECT':
            // 舰长进入信息2
            const msgs = msg.data.copy_writing
            const match = msgs.match(/<%(.+?)%>/)
            UserName = match[1]
            UserGuardLevel = msg.data.privilege_type
            logger.WelcomeGuard(UserGuardLevel, UserName)
            break
        case "GUARD_BUY":
            // 上舰长消息
            UserName = msg.data.username
            UserGuardLevel = msg.data.guard_level
            GiftName = UserGuardLevel == 3 ? "舰长" :
                UserGuardLevel == 2 ? "提督" :
                    UserGuardLevel == 1 ? "总督" : ""
            GiftCount = msg.data.num
            logger.GuardBuy(UserName, GiftName, GiftCount)
            break
        case 'USER_TOAST_MSG':
            logger1.debug(JSON.stringify(msg))
            break
        case "SUPER_CHAT_MESSAGE":
        case "SUPER_CHAT_MESSAGE_JPN":
            // 醒目留言
            CommentText = msg.data.message
            UserName = msg.data.user_info.uname
            const Price = msg.data.price
            const SCKeepTime = msg.data.time
            logger.SuperChat(UserName, Price, CommentText, SCKeepTime)
            break
        case 'SUPER_CHAT_MESSAGE_DELETE':
            // 醒目留言删除
            logger1.debug(JSON.stringify(msg))
            break
        case 'INTERACT_WORD':
            // 观众互动信息
            const InteractType = msg.data.msg_type
            UserName = msg.data.uname
            logger.Interact(InteractType, UserName, msg.data.spread_desc)
            break
        case 'WARNING':
            // 超管警告
            logger.warning(`超管警告：${msg.msg}`)
            logger.warning(`超管警告：${msg.msg}`)
            logger.warning(`超管警告：${msg.msg}`)
            await SendDingTalk(`${msg.roomid} 超管警告：${msg.msg}`)
            await SendDingTalk(`${msg.roomid} 超管警告：${msg.msg}`)
            await SendDingTalk(`${msg.roomid} 超管警告：${msg.msg}`)
            break
        case 'CUT_OFF':
            // 超管切断
            logger1.debug(JSON.stringify(msg))
            logger.warning(`超管切断直播：${msg.msg}`)
            logger.warning(`超管切断直播：${msg.msg}`)
            logger.warning(`超管切断直播：${msg.msg}`)
            await SendDingTalk(`${msg.roomid} 超管切断直播！！！`)
            await SendDingTalk(`${msg.roomid} 超管切断直播！！！`)
            await SendDingTalk(`${msg.roomid} 超管切断直播！！！`)
            break
        default:
            logger1.debug(JSON.stringify(msg))
            break
    }

}

export default (msg: any, online: any) => {
    return main(msg, online)
}
