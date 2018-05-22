const server = require("../head")
const assert = require('assert')

const me = server.modules.sessions
const data = me.data

const md_db = server.modules.db

me.start = async function()
{
    console.log("start to load sessions")

    const sessions = await md_db.load("sessions",{})

    for(var i = 0,len = sessions.length;i < len;++i)
    {
        var db_one = sessions[i]

        data[db_one._id] = db_one.val
    }

    console.log("finish loading sessions")
    console.dir(data)

    return true
}

me.get = async function(id)
{
    return data[id]
}

me.set = async function(id,val)
{
    data[id] = val

    md_db.upsert("sessions",{_id:id},{val : val})
}

me.destroy = async function(id)
{
    delete data[id]

    md_db.remove("sessions",{_id:id})
}