const server = require("../head")
const app = server.app
const routers = server.routers

//------------------------------------

require("./error")
require("./log")

require("./template")

require("./home")
require("./posts")
require("./comments")

require("./admin")
//------------------------------------
app
    .use(routers.routes())
    .use(routers.allowedMethods());