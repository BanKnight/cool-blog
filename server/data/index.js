const server = require("../head")

function new_module()
{
    return { data : {}}
}

//---------------------------------------------
server.modules.basic = new_module()
server.modules.db = require("./db")
server.modules.users = require("./users")            //仅仅用来管理登录用的

server.modules.posts = require("./posts")
server.modules.comments = new_module()
server.modules.cache = require("./cache")
