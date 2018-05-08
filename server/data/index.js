const server = require("../head")

function new_module()
{
    return { data : {}}
}

//---------------------------------------------
server.modules.basic = new_module()
server.modules.db = require("./db")

server.modules.posts = require("./posts")
server.modules.comments = new_module()
server.modules.cache = new_module()
server.modules.static = new_module()