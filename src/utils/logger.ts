import * as chalk from 'chalk'
import * as log4js from "log4js"

log4js.configure({
    appenders: {
        console: {type: "console"},
        default: {
            type: 'dateFile',
            filename: "logs/Bili",
            pattern: "yyyy-MM-dd.log",
            maxLogSize: 20971520,
            backups: 10,
            encoding: "utf-8",
            alwaysIncludePattern: true

        },
    },
    categories: {
        default: {appenders: ['console', 'default'], level: 'ALL'}
    }
});

const logger = (name: string | undefined) => {
    const logger = log4js.getLogger(name);

    return {
        debug(message: any, context = []) {
            logger.debug(`${chalk.cyan('DEBUG')} ${message} ${context}`);
        },
        info(message: any, context = []) {
            logger.info(`${chalk.cyan('INFO')} ${message} ${context}`);
        },
        notice(message: any, context = []) {
            logger.info(`${chalk.green('NOTICE')} ${message} ${context}`);
        },
        warning(message: any, context = []) {
            logger.warn(`${chalk.yellow('WARNING')} ${message} ${context}`);
        },
        error(message: any, context = []) {
            logger.error(`${chalk.red('ERROR')} ${message} ${context}`)
        },
        connectToLiveRoom(status: string, roomId: any, uid: any) {
            if (status === 'ok') {
                logger.info(`${chalk.magenta('连接到直播间 ')}${chalk.yellow(roomId)}${chalk.green(' 成功!')}${chalk.magenta(' 归属用户编号：')}${chalk.yellow(uid)}`);
            } else {
                logger.info(`${chalk.magenta('连接到直播间 ')}${chalk.yellow(roomId)}${chalk.red(' 失败!')}${chalk.magenta(' 归属用户编号：')}${chalk.yellow(uid)}`);
            }
        },
    }
}
const Danmu = () => {
    const logger = log4js.getLogger('DanMu')
    return {
        Comment(isAdmin: any, isVIP: any, UserName: any, CommentText: unknown) {
            logger.info(`${`${isAdmin ? chalk.yellow('[管]') : ''}${isVIP ? chalk.yellow('[爷]') : ''}${chalk.green(`${UserName}`)}`}：${chalk.magenta(CommentText)}`)
        },
        GiftSend(UserName: unknown, giftName: unknown, GiftCount: unknown) {
            logger.info(`收到道具：${chalk.magenta(UserName)} 贈送的: ${chalk.yellow(giftName)} x ${chalk.red(GiftCount)}`);
        },
        noticeMsg(CommentText: string) {
            logger.info(chalk.yellow(CommentText.replace(/%/g, "")))
        },
        Welcome(isAdmin: any, UserName: any){
            const text = isAdmin ? `欢迎老爷 ${UserName} 进入直播间` : `欢迎老爷和管理员 ${UserName} 进入直播间`;
            logger.info(text)
        },
        WelcomeGuard(UserGuardLevel: any, UserName: any){
            let guard_text
            switch (UserGuardLevel) {
                case 1:
                    guard_text = "总督"
                    break;
                case 2:
                    guard_text = "提督"
                    break;
                case 3:
                    guard_text = "舰长"
                    break;
            }
            logger.info(`欢迎${guard_text}: ${UserName} 进入直播间`)
        },
        GuardBuy(UserName: any, GiftName: any, GiftCount: any) {
            logger.info(`上船:${UserName} 購買了 ${GiftName} x ${GiftCount}`)
        },
        roomRealTimeMessage(fans: any, fans_club: any, online: any) {
            logger.info(`被动信息更新:粉丝数${chalk.green(fans)},粉丝团成员数${chalk.red(fans_club)}当前房间人气${chalk.yellow(online)}`);
        },
        SuperChat(){

        },
        Interact(InteractType: any, UserName: unknown, spread_desc: unknown) {
            switch (InteractType) {
                case 1:
                    if (spread_desc === '星光推广') {
                        logger.info(`[${chalk.magenta(spread_desc)}]${chalk.cyan(UserName)} 进入了直播间`)
                    } else {
                        logger.info(`${chalk.cyan(UserName)} 进入了直播间`)
                    }
                    break
                case 2:
                    logger.info(`${chalk.cyan(UserName)} 关注了直播间`)
                    break
                case 3:
                    logger.info(`${chalk.cyan(UserName)} 分享了直播间`)
                    break
                case 4:
                    logger.info(`${chalk.cyan(UserName)} 将直播间加入到了特别关注`)
                    break
                case 5:
                    logger.info(`${chalk.cyan(UserName)} 现在是相互关注`)
                    break
            }
        },
        warning(CommentText: any) {
            logger.warn(chalk.yellow(CommentText));
        },
    }
}

export {
    logger,
    Danmu
}
