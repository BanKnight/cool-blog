const path = require("path")
const static = require("koa-static-cache")

const LRU = require('lru-cache')
const files = new LRU({ max: 1000 })

const config = require("../../config")

const server = require("../head")
const app = server.app

let cwd = process.cwd()
let content = path.isAbsolute(config.content)?config.content : path.join(cwd,config.content)
let theme = path.join(content,"themes",config.theme ? config.theme :"cool")

app.use(static(theme,{prefix:"/public/",buffer:true,gzip:true,dynamic:true,files:files}))

