const Koa = require("koa")
const Router = require("koa-router")

const server = {
    app : new Koa(),
    routers : Router(),
    modules : {},
}
module.exports = server

//--------------------------------
server.start_modules = async()=>
{
    for(var element in server.modules)
    {
        let that = server.modules[element]
        if(that.start != null)
        {
            let ret = await that.start()
            if(ret == false)
            {
                return false
            }
        }
    }

    return true
}

server.start_routers = ()=>
{
    require("./routers")
}


