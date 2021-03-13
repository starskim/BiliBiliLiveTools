import module_auth from "./modules/auth"
import module_danmuinfo from "./modules/DanMuInfo";
import init from "./utils/init"
import {getRoomInfo} from "./modules/Live";
import sleep from "./utils/sleep";

const app = async () => {
    init()
    await getRoomInfo()
    await module_danmuinfo()
    while (true) {
        await module_auth()
        await sleep(1000)
    }

};

app()
