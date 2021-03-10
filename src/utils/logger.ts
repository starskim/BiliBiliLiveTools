import * as chalk from 'chalk'
import * as log4js from "log4js"

const DateInfo = new Date()
const TimeString = DateInfo.toLocaleTimeString()

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
export const logger = (name: string | undefined) => log4js.getLogger(name);


export default {

    debug: (message: any) => console.log(`${chalk.bgCyan('DEBUG')}[${chalk.cyan(TimeString)}] ${message}`),
    info: (message: any) => console.log(`${chalk.bgCyan('INFO')}[${chalk.cyan(TimeString)}] ${message}`),
    notice: (message: any) => console.log(`${chalk.bgGreen('NOTICE')}[${chalk.green(TimeString)}] ${message}`),
    warning: (message: any) => console.log(`${chalk.bgYellow('WARNING')}[${chalk.yellow(TimeString)}] ${message}`),
    error: (message: any) => console.log(`${chalk.bgRed('ERROR')}[${chalk.red(TimeString)}] ${message}`),
}
