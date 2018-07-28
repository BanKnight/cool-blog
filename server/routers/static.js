const path = require("path")
const static = require("koa-static-cache")
const helmet = require('koa-helmet')

const LRU = require('lru-cache')

const config = include("./config")
const logs = global.logs("static")

const server = global.server
const app = server.app

{//them static
    const files = new LRU({ max: 1000 })

    let theme = path.resolve(config.content, "themes", config.theme ? config.theme : "cool", "public")

    app.use(static(theme, { prefix: "/public/", buffer: true, maxAge: 365 * 24 * 60 * 60, gzip: true, dynamic: true, files: files }))
}

{//admin static
    const files = new LRU({ max: 1000 })

    let admin_static = path.resolve("admin", "public")

    logs.debug(`admin static ${admin_static}`)

    app.use(static(admin_static, { prefix: "/public/", buffer: true, gzip: true, dynamic: true, files: files }))
}

app.use(helmet.noCache())           //之后的才是浏览器不要缓存



