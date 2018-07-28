
const logs = global.logs("core")

const config = include("./config")
const server = assert(global.server)

const routers = server.routers

server.start = async () =>
{
    let ret = await server.start_modules()

    if (ret == false)
    {
        return false
    }

    server.start_routers()

    server.app.listen(config.port)

    logs.debug(`listening at ${config.port}`)

    return true
}

server.start_routers = function ()
{
    server.app
        .use(server.routers.routes())
        .use(server.routers.allowedMethods())
}

server.on_log = async (ctx, next) => 
{
    logs.debug(`Process ${ctx.req.method} ${ctx.req.url}...`);

    await next()
}

server.on_err = function (err)
{
    console.error(err)
}

