const login_checker = require("./login_checker")

const cache_router = require("./cache")
const body_router = require("./body_parser")
const server = require("../head")

const app = server.app
const routers = server.routers
const md_posts = server.modules.posts
const md_cache = server.modules.cache

routers.get("/admin",login_checker,async(ctx,next)=>
{

})

routers.post("/admin/login",login_checker,async(ctx,next)=>
{

})

routers.get("/admin/posts",login_checker,async(ctx,next)=>
{

})
/*
    new post
    form urlencode or json
*/
routers.put("/admin/post",body_router,async(ctx,next)=>
{
    const post = await md_posts.new_post(ctx.request.body)

    ctx.body = {message:"ok",id:post.id}

    md_cache.unset('/')
    md_cache.unset('/posts')
    md_cache.unset_under('/posts')
})

routers.get("/admin/post/:id",login_checker,async(ctx,next)=>
{

})


