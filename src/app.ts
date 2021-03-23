import module_auth from "./modules/auth"
// import module_danmuinfo from "./modules/DanMuInfo"
import init from "./utils/init"
import module_live from "./modules/Live"
import sleep from "./utils/sleep"

const logger = require('./utils/logger').logger('App')

const app = async () => {
    init()
    // await module_danmuinfo()
    await module_live()
    while (true) {
        await module_auth()
        await sleep(1000)
    }

};

app().catch(error => logger.error(error.message))
