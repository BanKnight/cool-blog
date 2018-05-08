const server = require("../head")
const cache_router = require("./cache")
const routers = server.routers

const md_posts = server.modules.posts

routers.get("/",cache_router,async(ctx,next)=>
{
    const posts = md_posts.get_posts_by_page()

    await ctx.render("home",{title : "Ban's blog",posts: posts})
})