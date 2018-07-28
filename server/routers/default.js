const helmet = require('koa-helmet')
const limit = require('koa-limit')
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')

const server = assert(global.server)
const routers = server.routers

const md_basic = server.get("basic")

//------------------------------------------------------
routers.use(server.on_log)                 //日志记录

//1分钟限制用户访问不超过1000次
routers.use(convert(limit({
  limit: 1000,
  interval: 1000 * 60
})))

routers.use(helmet.noSniff())
routers.use(helmet.frameguard())
routers.use(helmet.xssFilter())
routers.use(helmet.hidePoweredBy())     //      删除了 header 中的 X-Powered-By 标签
routers.use(helmet.ieNoOpen())

routers.use(md_basic.mount_state)   //挂上basic
routers.use(bodyParser())





