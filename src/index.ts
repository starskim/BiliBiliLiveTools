import module_auth from "modules/Auth"
import module_danmuku from "modules/DanMuKu"
import module_web from "modules/web/index"
import {getRoomInfo} from "utils"
import init from "utils/init"
import config from "utils/config"
import sleep from "utils/sleep"
import * as fs from "fs";
import {join} from "path";

const logger = require('utils/logger').logger('App')

class App {
    constructor() {
        if (!fs.existsSync(join(process.cwd(), '/download'))) {
            fs.mkdirSync(join(process.cwd(), '/download'))
        }
    }

    init = async () => {
        this.initUnCaughtException()
        init()
        await this.initExitSignal()
        if (config.get('connect.port')) {
            module_web.listen(config.get('connect.port'), parseInt(config.get('connect.listenInaddrAny')) ? undefined : '127.0.0.1')
            logger.debug(`Listening Port ${config.get('connect.port')}`)

        }
        await getRoomInfo()
        module_danmuku()
        while (true) {
            await module_auth()
            await sleep(1000)
        }
    }

    initUnCaughtException = () => {

        logger.info(`initUnCaughtException`)

        process.on("uncaughtException", (error) => {
            logger.error("exception caught: ", error);
        });
    }

    initExitSignal = async () => {

        logger.info(`initExitSignal`)

        process.on("SIGINT", () => {
            logger.info("Receive exit signal, the process will exit after 3 seconds.")
            logger.info("Process exited by user.")


            setTimeout(() => {
                process.exit()
            }, 3000);
        })
    }

}

const app = new App()

app.init().catch(error => logger.error(error.message))

export {
    App,
    app
}
