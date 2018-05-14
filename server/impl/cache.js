const server = require("../head")
const assert = require('assert')

const me = server.modules.cache
const data = me.data

me.get_node_from_path = function(path)
{
    path = path.substr(1)
    const array = path.split('/')

    let parent = data
    let curr = data

    array.forEach(element => {
        if(element.length > 0)
        {
            parent = curr
            curr = parent.children[element]

            if(curr == null)
            {
                curr = {children:{}}
                parent.children[element] = curr
            }
        }
    })

    return curr
}

me.get = function(path)
{
    const curr = me.get_node_from_path(path)

    return curr
}

me.set = function(path,val)
{
    assert(path)
    assert(val)

    const curr = me.get_node_from_path(path)

    curr.real = val    
}

me.unset = function(path)
{
    const curr = me.get_node_from_path(path)

    curr.real = null
}

me.unset_under = function(path)
{
    const curr = me.get_node_from_path(path)

    curr.children = {}
}

