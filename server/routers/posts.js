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
    const info = md_posts.get_posts_by_page(parseInt(ctx.params.page))

    await ctx.render("posts",info)
})

routers.get("/post/:id",cache_router,async(ctx,next)=>
{
    const post = await md_posts.get_post(ctx.params.id)

    if(post == null)
    {
        await ctx.throw(404)
        return
    }

    console.log(`try to get a post,id:${post.id},url:${post.url},title:${post.title}`)

    await ctx.render("post",{post: post})
})