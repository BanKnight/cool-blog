const assert = global.assert
const game = require("./head")
const me = game.get("event")
const data = me.data

/**
 * 监听事件
 * @param {事件名称} name 
 * @param {模块名称} module_name 
 * @param {函数名称} func_name 
 */
me.listen = function (name, module_name, func_name)
{
    let exist = data.listen[name]
    if (exist == null)
    {
        exist = new Map()
        data.listen[name] = exist
    }

    let module_inst = typeof (module_name) == "string" ? game.get(module_name) : module_name

    let that_funcs = exist.get(module_inst)
    if (that_funcs == null)
    {
        that_funcs = {}
        exist.set(module_inst, that_funcs)
    }

    that_funcs[func_name] = true
}

/**
 * 监听事件
 * @param {事件名称} name 
 * @param {模块名称} module_name 
 * @param {函数名称} func_name 
 */
me.unlisten = function (name, module_name, func_name)
{
    let exist = data.listen[name]
    if (exist == null)
    {
        return
    }

    if (module_name == null)
    {
        data.listen[name] = {}
        return
    }

    let module_inst = typeof (module_name) == "string" ? game.get(module_name) : module_name

    let that_funcs = exist.get(module_inst)
    if (that_funcs == null)
    {
        return
    }

    if (func_name == null)
    {
        exist.set(module_inst, {})
        return
    }
    if (data.triging > 0)
    {
        that_funcs[func_name] = false
    }
    else
    {
        delete that_funcs[func_name]        //如果是trige中删除 那么有可能会出bug
    }
}

/**
 * 触发事件回调
 * @param {事件名称} name 
 * @param {事件参数} args
 */
me.trige = async function (name, ...args)
{
    let exist = data.listen[name]
    if (exist == null)
    {
        return
    }

    data.triging++

    for (let [module, funcs] of exist)
    {
        assert(module, `${module} is not exists`)

        for (let func_name in funcs)
        {
            let enabled = funcs[func_name]
            if (enabled)
            {
                await module[func_name](...args)
            }
        }
    }
    data.triging--
}

game.listen = me.listen
game.unlisten = me.unlisten
game.trige = me.trige