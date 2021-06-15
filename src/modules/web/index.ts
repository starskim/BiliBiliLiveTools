import * as Koa from "koa"
// import router from "./router"
import * as bodyParser from 'koa-bodyparser'
// import * as mount from 'koa-mount'

const app = new Koa()
app.use(bodyParser())
// app.use(mount('/', router.routes())).use(router.allowedMethods());


export default app
