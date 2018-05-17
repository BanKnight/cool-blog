const path = require("path")
const static = require("koa-static-cache")

const LRU = require('lru-cache')

const config = require("../../config")

const server = require("../head")
const app = server.app

{//them static
    const files = new LRU({ max: 1000 })

    let theme = path.resolve(config.content,"themes",config.theme ? config.theme :"cool","public")
    
    app.use(static(theme,{prefix:"/public/",buffer:true,gzip:true,dynamic:true,files:files}))
}

{//admin static
    const files = new LRU({ max: 1000 })

    let admin_static = path.resolve("admin","public")

    console.log(`admin static ${admin_static}`)
    
    app.use(static(admin_static,{prefix:"/public/",buffer:true,gzip:true,dynamic:true,files:files}))
}


