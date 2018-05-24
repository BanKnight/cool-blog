const config = require("../../config")

const login_checker = require("./login_checker")

const cache_router = require("./cache")
const server = require("../head")

const app = server.app
const routers = server.routers
const md_posts = server.modules.posts
const md_cache = server.modules.cache
const md_basic = server.modules.basic
const md_mail = server.modules.mail

routers.get("/admin",login_checker.find,async(ctx,next)=>
{
    if(ctx.user)
    {
        console.log("begin to redirect")
        console.dir(ctx.session)
        ctx.redirect("/admin/posts")
        return
    }

    await ctx.render("admin.login",{})
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

        md_mail.send("notice","there is someone loging your website")

        return
    }

    await ctx.redirect("/admin")
})

routers.get("/admin/posts",login_checker.must,async(ctx,next)=>
{
    const info = md_posts.get_posts_by_page(1,10)

    await ctx.render("admin.posts",info)
})

routers.get("/admin/posts/:page",login_checker.must,async(ctx,next)=>
{
    const info = md_posts.get_posts_by_page(parseInt(ctx.params.page),10)

    await ctx.render("admin.posts",info)
})

routers.get("/admin/post",login_checker.must,async(ctx,next)=>
{
    await ctx.render("admin.post",{})
})
/*
    new post or edit post
    form urlencode or json
*/
routers.post("/admin/post",login_checker.must,async(ctx,next)=>
{
    let params = ctx.request.body
    let old_post = null
    let post = null

    if(params.real_id != '')
    {
        old_post = await md_posts.get_post(params.real_id)
    }
    //new
    if(old_post == null)
    {
        params.real_id = null
        post = await md_posts.new_post(params)
    }
    else
    {
        post = old_post

        if(params.real_id == params.id)
        {//edit without the url/id
            params.real_id = null
        }

        post.title = params.title
        post.summary = params.summary
        post.content = params.content

        md_posts.upd_post(post,params.real_id)
    }

    ctx.body = {result:"ok",id:post.id}

    md_cache.unset('/')
    md_cache.unset(`/post/${post.id}`)
    md_cache.unset('/posts')
    md_cache.unset_under('/posts')

    if(params.real_id)
    {
        md_cache.unset(`/post/${params.real_id}`)
        md_cache.unset(`/comments/${params.real_id}`)
        md_cache.unset_under(`/comments/${params.real_id}`)

        md_comments.change(params.real_id,params.id)
    }
})

routers.get("/admin/post/:id",login_checker.must,async(ctx,next)=>
{
    const post = await md_posts.get_post(ctx.params.id)

    if(post == null)
    {
        await ctx.throw(404)
        return
    }

    //console.log(`try to get a post,id:${post.id},url:${post.url},title:${post.title}`)

    await ctx.render("admin.post",{post: post})
})

routers.del("/admin/post/:id",login_checker.must,async(ctx,next)=>
{
    md_posts.del_post(ctx.params.id)

    ctx.body = {message:"ok",id:ctx.params.id}

    md_cache.unset('/')
    md_cache.unset(`/post/${post.id}`)
    md_cache.unset('/posts')
    md_cache.unset_under('/posts')

})

routers.get("/admin/setting",login_checker.must,async(ctx,next)=>
{
    await ctx.render("admin.setting")
})

routers.post("/admin/setting",login_checker.must,async(ctx,next)=>
{
    let params = ctx.request.body
    let changed = false

    console.dir(params)

    for(var key in params)
    {
        var val = params[key]

        console.log(`set ${key}:${val}`)

        await md_basic.set(key,val)

        changed = true
    }

    ctx.body = {message:"ok"}

    if(changed)
    {
        md_cache.unset("/")
        md_cache.unset_under("/")
    }
})


