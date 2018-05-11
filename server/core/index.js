const path = require("path")

const config = require("../../config")
const server = require("../head")

const app = server.app
const routers = server.routers

server.start = async()=>
{
    let ret = await server.start_modules()

    if(ret == false)
    {
        return false
    }

    server.start_routers()

    app.listen(config.port)

    console.log(`listening at ${config.port}`)

    return true
}

server.on_log = async (ctx, next) => 
{
    console.log(`Process ${ctx.req.method} ${ctx.req.url}...`);
    console.log(`ctx info ${ctx.path} ${ctx.url} `)
    console.dir(ctx.query)
    
    await next()
}

server.on_err = function(err)
{
    console.error(err)
}

