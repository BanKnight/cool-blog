const compress = require('koa-compress')
const compose = require('koa-compose')

const server = require("../head")
const md_cache = server.modules.cache

const cacher = async(ctx,next)=>
{
    if(ctx.req.method != "GET")
    {
        return next()   
    }

    const cache = md_cache.get(ctx.path)
    if(cache && cache.real)
    {
        ctx.body = cache.real
        console.log(`fetch from cache ${ctx.path}`)
        return
    }

    await next()
    
    md_cache.set(ctx.path,ctx.body)
    
}

const compresser = compress({
    filter: function (content_type) {
        return /text/i.test(content_type)
    },
    threshold: 100,
    flush: require('zlib').Z_SYNC_FLUSH
  })


//Todo change to cache and compress
module.exports = compose([cacher])