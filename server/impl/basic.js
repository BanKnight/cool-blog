const server = require("../head")
const assert = require('assert')

const me = server.modules.basic
const data = me.data

me.start = function()
{
    data.web_name = "cool"
    data.web_description = "cool's description"
}

me.mount_state = function(ctx,next)
{
    ctx.state = data

    return next()
}