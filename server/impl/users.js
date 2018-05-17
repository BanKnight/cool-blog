const config = require("../../config")

const server = require("../head")
const assert = require('assert')

const me = server.modules.users
const data = me.data

me.start = function()
{
    data[1] = {
        name:config.user.name
    }
}

me.get = function(id)
{
    return data[id]
}

me.set = function(id,val)
{
    data[id] = val
}

me.destroy = function(id)
{
    delete data[id]
}