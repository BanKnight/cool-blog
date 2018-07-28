const compress = require('koa-compress')
const compose = require('koa-compose')
const logs = global.logs("cache")

const server = global.server
const md_cache = server.get("cache")

const cacher = async (ctx, next) =>
{
    if (ctx.req.method != "GET")
    {
        return next()
    }

    const cache = md_cache.get(ctx.path)
    if (cache && cache.real)
    {
        let info = cache.real

        ctx.type = info.type
        ctx.body = info.body

        ctx.set("content-encoding", info.encoding)

        logs.debug(`fetch cache for:${ctx.path}`)

        return
    }

    await next()

    const info = {
        type: ctx.type,
        encoding: ctx.response.get("content-encoding"),
        body: ctx.body,
    }

    //logs.debug(`return type is:${ctx.type},encoding:${info.encoding}`)

    // console.dir(info)

    md_cache.set(ctx.path, info)

}

const compresser = compress({
    filter: function (content_type)
    {
        return /text/i.test(content_type)
    },
    threshold: 100,
    flush: require('zlib').Z_SYNC_FLUSH
})


//Todo change to cache and compress
module.exports = compose([compresser, cacher])