const server = require("../head")
const cache_router = require("./cache")
const routers = server.routers

const md_posts = server.modules.posts

routers.get("/",cache_router,async(ctx,next)=>
{
    console.log("handle home page")

    const info = md_posts.get_posts_by_page()

    //console.log(`curr:${info.curr_page},max:${info.max_page},count:${md_posts.data.posts_sorted.length}`)

    await ctx.render("home",info)
})

routers.get("/about",cache_router,async(ctx,next)=>
{
    await ctx.render("about")
})