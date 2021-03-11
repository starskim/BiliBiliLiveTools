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

export const logger = (name: string | undefined) => {
    const logger = log4js.getLogger(name);

    return {
        debug: (message: any, context=[]) => logger.debug(`${chalk.cyan('DEBUG')} ${message} ${context}`),
        info: (message: any, context=[]) => logger.info(`${chalk.cyan('INFO')} ${message} ${context}`),
        notice: (message: any, context=[]) => logger.info(`${chalk.green('NOTICE')} ${message} ${context}`),
        warning: (message: any, context=[]) => logger.warn(`${chalk.yellow('WARNING')} ${message} ${context}`),
        error: (message: any, context=[]) => logger.error(`${chalk.red('ERROR')} ${message} ${context}`),
    }
}
