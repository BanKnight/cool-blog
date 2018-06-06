const server = require("../head")
const assert = require('assert')

const me = server.modules.timers
const data = me.data

me.run_after = (delay,cb)=>
{
    return {
        method : "after",
        id : setTimeout(cb,delay),
    }
}

me.run_every = (interval,cb)=>
{
    return {
        method : "every",
        id : setInterval(cb,interval)
    }
}

me.run_revery = (from,to,cb)=>
{
    assert(to > from)

    let info = {
        method:"revery",
    }

    let wrapper = function()
    {
        info.id = setTimeout(wrapper,rand(from,to))
        cb()
    }

    info.id = setTimeout(wrapper,rand(from,to))
}

me.remove = (info)=>
{
    switch(info.method)
    {
        case "every":
        case "revery":
            clearInterval(info.id)
            break
        default:
            clearTimeout(info.id)
            break
    }
}

server.run_after = me.run_after
server.run_every = me.run_every
server.run_revery = me.run_revery
server.remove_timer = me.remove

server.sleep = async(delay)=>
{
    return new Promise((resolve)=>
    {
        me.run_after(delay,()=>
        {
            resolve()
        })
    })
}