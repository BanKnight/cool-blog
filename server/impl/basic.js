const server = require("../head")
const assert = require('assert')

const me = server.modules.basic
const data = me.data

const md_db = server.modules.db

me.start = async function()
{
    const db_data = await md_db.load("web",{})

    for(var i = 0,len = db_data.length;i < len;++i)
    {
        var db_one = db_data[i]

        data[db_one._id] = db_one.val

        console.log(`load from web ${db_one._id}:${db_one.val}`)
    }

    data.web_name = data.web_name || "Cool blog"
    data.web_description = data.web_description || "cool description"
    data.web_about = data.web_about || ""

    return true
}

me.mount_state = function(ctx,next)
{
    ctx.state = data

    return next()
}

me.set = function(key,val)
{
    data[key] = val

    md_db.upsert("web",{_id : key},{val : val})
}

me.get = function(key)
{
    return data[key]
}