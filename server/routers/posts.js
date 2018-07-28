const cache_router = require("./cache")
const logs = global.logs("posts")

const server = global.server

const md_posts = server.get("posts")

const routers = server.routers

routers.get("/posts", cache_router, async (ctx, next) =>
{
    const posts = md_posts.get_posts_by_page()

    await ctx.render("posts", { title: "BanSky's blog", posts: posts })
})

routers.get("/posts/:page", cache_router, async (ctx, next) =>
{
    const info = md_posts.get_posts_by_page(parseInt(ctx.params.page))

    await ctx.render("posts", info)
})

routers.get("/post/:id", cache_router, async (ctx, next) =>
{
    const post = await md_posts.get_post(ctx.params.id)

    if (post == null)
    {
        await ctx.throw(404)
        return
    }

    logs.debug(`try to get a post,id:${post.id},title:${post.title}`)

    await ctx.render("post", { post: post })
})