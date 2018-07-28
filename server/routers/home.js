
const cache_router = require("./cache")
const logs = global.logs("home")

const server = global.server
const routers = server.routers

const md_posts = server.get("posts")
const md_sitemap = server.get("sitemap")

routers.get("/", cache_router, async (ctx, next) =>
{
    logs.debug("handle home page")

    const info = md_posts.get_posts_by_page()

    //logs.debug(`curr:${info.curr_page},max:${info.max_page},count:${md_posts.data.posts_sorted.length}`)

    await ctx.render("home", info)
})

routers.get("/about", cache_router, async (ctx, next) =>
{
    await ctx.render("about")
})

routers.get("/sitemap.txt", cache_router, async (ctx, next) =>
{
    ctx.body = md_sitemap.get_txt()
})

routers.get("/robots.txt", cache_router, async (ctx, next) =>
{
    ctx.body = md_sitemap.get_robots()
})