const server = require("../head")
const assert = require('assert')

const me = server.modules.sessions
const data = me.data

const md_db = server.modules.db

me.start = async function()
{
    console.log("start to load sessions")

    let now = Date.now()

    md_db.remove_many("sessions",{expired : {$lte:now}})

    const sessions = await md_db.load("sessions")

    for(var i = 0,len = sessions.length;i < len;++i)
    {
        let db_one = sessions[i]
        let id = db_one._id

        data.sessions[id] = db_one.val
        data.timeouts[id] = server.run_after(db_one.expired - now,()=>
        {
            delete data.sessions[id]
            delete data.timeouts[id]

            console.log(`expired session ok 1:${id}`)
    
            md_db.remove("sessions",{_id:id})
        })
    }

    console.log("finish loading sessions")
    console.dir(data)

    return true
}

me.get = async function(id)
{
    let val = data.sessions[id]
    if(val)
    {
        console.log(`get session ok:${id}`)
    }
    else
    {
        console.log(`get session failed:${id}`)
    }
    return data.sessions[id]
}

me.set = async function(id,val,timeout)
{
    if (id in data.timeouts) clearTimeout(data.timeouts[id]);

    console.log(`set session ${id},${timeout},${typeof(timeout)}，${timeout > 5000}`)

    data.sessions[id] = val
    data.timeouts[id] = server.run_after(timeout,()=>
    {
        delete data.sessions[id]
        delete data.timeouts[id]

        md_db.remove("sessions",{_id:id})

        console.log(`expired session ok:${id},${timeout}`)

    })

    md_db.upsert("sessions",{_id:id},{val : val,expired : Date.now() + timeout})
}

me.destroy = async function(id)
{
    if (id in data.timeouts) server.remove_timer(data.timeouts[id]);

    delete data.sessions[id]
    delete data.timeouts[id]

    console.log(`destroy session ${id}`)

    md_db.remove("sessions",{_id:id})
}