const cache_router = require("./cache")
const server = require("../head")

const app = server.app
const routers = server.routers
const md_posts = server.modules.posts

routers.get("/posts",cache_router,async(ctx,next)=>
{ 
    const posts = md_posts.get_posts_by_page()

    await ctx.render("posts",{title : "BanSky's blog",posts: posts})
})

routers.get("/posts/:page",cache_router,async(ctx,next)=>
{
    const posts = md_posts.get_posts_by_page(parseInt(ctx.params.page))

    await ctx.render("posts",{title : "BanSky's blog",posts: posts})
})

routers.get("/post/:id",cache_router,async(ctx,next)=>
{
    const post = await md_posts.get_post(parseInt(ctx.params.id))

    if(post == null)
    {
        await ctx.throw(404)
        return
    }

    console.log(`try to load a post,id:${ctx.params.id}`)
    console.dir(post)

    await ctx.render("post",{title : "Ban's blog",post: post})
})