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
server.modules.comments = require("./comments")
server.modules.cache = require("./cache")
server.modules.mail = new_module()

server.modules.sessions = new_module()
