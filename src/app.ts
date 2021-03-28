import module_auth from "./modules/Auth"
import init from "./utils/init"
import module_live from "./modules/Live"
import sleep from "./utils/sleep"

const logger = require('./utils/logger').logger('App')

const app = async () => {
    init()
    module_live()
    while (true) {
        await module_auth()
        await sleep(1000)
    }

};

app().catch(error => logger.error(error.message))
