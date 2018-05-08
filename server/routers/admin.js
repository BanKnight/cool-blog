const login_checker = require("./login_checker")

const cache_router = require("./cache")
const server = require("../head")

const app = server.app
const routers = server.routers
const md_posts = server.modules.posts

routers.get("/admin",login_checker,async(ctx,next)=>
{

})

routers.post("/admin/login",login_checker,async(ctx,next)=>
{

})

routers.get("/admin/posts",login_checker,async(ctx,next)=>
{

})