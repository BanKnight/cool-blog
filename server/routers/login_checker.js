const session = require("koa-session-minimal")
const compose = require("koa-compose")
const server = require("../head")

const app = server.app
const md_users = server.modules.users

let cookie = {
    maxAge: '3600', // cookie有效时长
    expires: '3600',  // cookie失效时间
    path: '', // 写cookie所在的路径
    domain: '', // 写cookie所在的域名
    httpOnly: '', // 是否只用于http请求中获取
    overwrite: '',  // 是否允许重写
    secure: '',
    sameSite: '',
    signed: '',
  }

let store = {}

store.get = function(id)
{
    return store[id]
}
store.set = function(id,val)
{
    store[id] = val
}
store.del = function(id)
{
    delete store[id]
}

const session_router = session({
    key: 'SESSION_ID',
    store: store,
    cookie: cookie
  })


function find_user(ctx,next)
{
    let user_id = ctx.session.user_id || 1
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