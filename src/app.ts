import module_auth from "./modules/auth"

import init from "./utils/init"
import {getRoomInfo} from "./modules/Live";
import sleep from "./utils/sleep";

const app = async () => {
    init()
    await getRoomInfo()
    while (true) {
        await module_auth()
        await sleep(1000)
    }

};

app()
