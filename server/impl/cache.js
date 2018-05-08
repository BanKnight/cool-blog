const server = require("../head")
const assert = require('assert')

const me = server.modules.cache
const data = me.data

me.get = function(key)
{
    return data[key]
}

me.set = function(key,val)
{
    assert(key)
    assert(val)
    
    data[key] = {real: val}
}

me.unset = function(key)
{
    delete data[key]
}

