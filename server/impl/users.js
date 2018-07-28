const config = include("./config")

const server = global.server

const me = server.get("users")
const data = me.data

me.start = function ()
{
    data[1] = {
        name: config.user.name
    }
}

me.get = function (id)
{
    return data[id]
}

me.set = function (id, val)
{
    data[id] = val
}

me.destroy = function (id)
{
    delete data[id]
}