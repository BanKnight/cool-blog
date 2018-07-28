const Koa = require("koa")
const Router = require("koa-router")

let server = global.server

server.app = new Koa()
server.routers = Router()

//------------------------------------

require("./default")

require("./template")
require("./static")

require("./home")
require("./posts")
require("./comments")

require("./admin")
require("./debug")
//------------------------------------