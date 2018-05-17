const config = require("../../config")

const login_checker = require("./login_checker")

const cache_router = require("./cache")
const server = require("../head")

const app = server.app
const routers = server.routers
const md_posts = server.modules.posts
const md_cache = server.modules.cache

routers.get("/admin",login_checker.find,async(ctx,next)=>
{
    if(ctx.user)
    {
        console.log("begin to redirect")
        console.dir(ctx.session)
        ctx.redirect("/admin/posts")
        return
    }

    await ctx.render("admin_login",{})
})

routers.post("/admin",login_checker.find,async(ctx,next)=>
{
    if(ctx.user)
    {
        ctx.redirect("/admin/posts")
        return
    }

    let params = ctx.request.body

    if(params.name == config.user.name && params.password == config.user.pass)
    {
        ctx.session.user_id = 1
        ctx.redirect("/admin/posts")
        return
    }

    await ctx.redirect("/admin")
})

routers.get("/admin/posts",login_checker.must,async(ctx,next)=>
{
    const info = md_posts.get_posts_by_page(parseInt(ctx.params.page))

    await ctx.render("admin_posts",info)
})
/*
    new post
    form urlencode or json
*/
routers.put("/admin/post",login_checker.must,async(ctx,next)=>
{
    const post = await md_posts.new_post(ctx.request.body)

    ctx.body = {message:"ok",id:post.id}

    md_cache.unset('/')
    md_cache.unset('/posts')
    md_cache.unset_under('/posts')
})

routers.get("/admin/post/:id",login_checker.must,async(ctx,next)=>
{
    const post = await md_posts.get_post(parseInt(ctx.params.id))

    if(post == null)
    {
        await ctx.throw(404)
        return
    }

    //console.log(`try to get a post,id:${post.id},url:${post.url},title:${post.title}`)

    await ctx.render("admin_post",{post: post})
})

routers.post("/admin/post/:id",login_checker.must,async(ctx,next)=>
{
    const post = await md_posts.get_post(parseInt(ctx.params.id))

    if(post == null)
    {
        await ctx.throw(404)
        return
    }

    md_post.upd_post(post)

    //console.log(`try to get a post,id:${post.id},url:${post.url},title:${post.title}`)

    await ctx.render("admin_post",{post: post})
})

