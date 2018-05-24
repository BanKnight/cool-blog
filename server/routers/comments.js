const cache_router = require("./cache")
const server = require("../head")

const app = server.app
const routers = server.routers
const md_comments = server.modules.comments
const md_posts = server.modules.posts
const md_cache = server.modules.cache
const md_mail = server.modules.mail

routers.get("/comments/:post_id/:page",cache_router,async(ctx,next)=>
{ 
    const page = await md_comments.get_through_page(ctx.params.post_id,parseInt(ctx.params.page))

    ctx.body = page
})

routers.post("/comments/:post_id",cache_router,async(ctx,next)=>
{
    const post_id = ctx.params.post_id
    const comment = ctx.request.body

    const post = md_posts.get_post(post_id)
    if(post == null)
    {
        console.log(`no such post:${post_id}`)
        return
    }

    await md_comments.new(post_id,comment)

    console.dir(comment)

    ctx.body = {result : true,comment:comment}

    md_cache.unset(`/comments/${post_id}`)
    md_cache.unset_under(`/comments/${post_id}`)

    md_mail.send("notice",`${comment.author} has comment under your post:${post.title} - ${comment.content}`)

})