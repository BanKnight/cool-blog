const path = require("path")
const static = require("koa-static-cache")

const config = require("../../config")

const server = require("../head")
const app = server.app

const me = server.modules.static
const data = me.data

me.start = async()=>
{
    let cwd = process.cwd()
    let content = path.isAbsolute(config.content)?config.content : path.join(cwd,config.content)
    let theme = path.join(content,"themes",config.theme ? config.theme :"cool")

    static(theme,{buffer:true,gzip:true,})
}
