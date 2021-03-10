import module_auth from "./modules/auth"
import module_DanMuInfo from './modules/DanMuInfo'

import init from "./utils/init"

const app = async () => {
    init()
    await module_auth()
    await module_DanMuInfo()

};

app()
