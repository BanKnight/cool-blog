const session = require("koa-session-minimal")
const compose = require("koa-compose")
const server = require("../head")

const app = server.app
const md_users = server.modules.users
const md_sessions = server.modules.sessions

let cookie = {
    maxAge: 20 * 24 * 3600 * 1000, // cookie有效时长
  }


const session_router = session({
    store: md_sessions,
    cookie: cookie,
  })


function find_user(ctx,next)
{
    let user_id = ctx.session.user_id
    if(user_id == null)
    {
        return next()
    }

    let user = md_users.get(user_id)

    ctx.user = user

    return next()
}

function must_login(ctx,next)
{
    if(ctx.user == null)
    {
        ctx.redirect("/admin")
        return
    }

    return next()
}

module.exports = {
    must:compose([session_router,find_user,must_login]),
    find:compose([session_router,find_user]),
}