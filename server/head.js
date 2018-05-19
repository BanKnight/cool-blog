const Koa = require("koa")
const Router = require("koa-router")

const server = {
    app : new Koa(),
    routers : Router(),
    modules : {},
    sorted_mds :[]
}
module.exports = server

//--------------------------------
server.start_modules = async()=>
{
    for(var element in server.modules)
    {
        server.sorted_mds.push({name : element,md : server.modules[element]})
    }
    server.sorted_mds.sort(function(first,second)
    {
        if(first.md.priority && !second.md.priority)
        {
            return -1
        }
        if(!first.md.priority && second.md.priority)
        {
            return 1
        } 

        if(!first.md.priority)
        {
            return first.name - second.name
        }

        return second.md.priority - first.md.priority
    })

    //console.dir(server.sorted_mds)

    for(var i = 0;i < server.sorted_mds.length;++i)
    {
        let that = server.sorted_mds[i].md
        if(that.start != null)
        {
            console.log(`starting ${server.sorted_mds[i].name}`)

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


