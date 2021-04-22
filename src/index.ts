import module_auth from "modules/Auth"
import module_danmuku from "modules/DanMuKu"
import init from "utils/init"
import {getRoomInfo} from "utils"
import sleep from "utils/sleep"

const logger = require('utils/logger').logger('App')

class App {
    init = async () => {
        this.initUnCaughtException()
        init()
        await this.initExitSignal()
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
