const login_checker = require("./login_checker")
const logs = global.logs("debug")

const server = global.server

const routers = server.routers

const cmds = {}

// get 
//example:get modules.basic.data.xx
cmds.get = function (arg)
{
    return eval(`(${arg})`)
}

cmds.set = function ()
{

}

routers.get("/admin/debug", login_checker.must, async (ctx, next) =>
{
    await ctx.render("admin.debug")
})

routers.post("/admin/debug", login_checker.must, async (ctx, next) =>
{
    let params = ctx.request.body
    let cmd = params.cmd
    let arg = params.arg

    console.dir(params)

    try
    {
        let cmd_func = cmds[cmd]
        if (cmd_func == null)
        {
            ctx.body = { result: false, reason: "no such cmd" }
            return
        }

        let result = cmd_func(arg)
        if (result)
        {
            console.dir(result)
            ctx.body = { result: true, data: result }
            return
        }

        ctx.body = { result: true, data: "no result" }
    }
    catch (err)
    {
        logs.debug(err)
        ctx.body = { result: false, reason: err }
    }
})
