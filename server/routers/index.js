const server = require("../head")
const app = server.app
const routers = server.routers

//------------------------------------

//require("./error")
require("./log")
require("./state")
require("./default")

require("./template")
require("./static")

require("./body_parser")
require("./home")
require("./posts")
require("./comments")

require("./admin")
require("./debug")
//------------------------------------
app
    .use(routers.routes())
    .use(routers.allowedMethods());