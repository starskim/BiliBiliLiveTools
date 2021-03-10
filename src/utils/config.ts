require('dotenv').config()

const Conf = require('conf')
const config = new Conf({
    cwd: `${process.cwd()}/conf/`,
    configName: 'info.json',
    fileExtension: '',
})

export default config
