const logs = global.logs("game")

const game = {
    data: {},
    modules: {},
    sorted_mds: []
}
module.exports = game

//--------------------------------

/**
 * 注意：这里实现的继承是按照单实例来做的，并不是完整的类的继承的实现
 * 
 * @param {模块路径} path 
 * @param {模块信息} info 
 * info.ctor : 初始化数据的函数
 * info.super:继承的模块
 */
game.define = function (path, info)
{
    let md = game.get(path)
    if (md)
    {
        throw new Error(`${path} is already defined`)
    }

    info = info || {}

    let base = null

    if (info.super)
    {
        base = game.get(info.super)
        if (!base.data)
        {
            throw new Error(`you should define super first:${info.super}`)
        }
    }

    md = game.__new_md(path, base)

    md.data = {}
    md.ctor = info.ctor || function () { }

    game.__ctor(md, md.data)

    return md
}

/**
 * 获取模块实例
 * @param {名字} name 
 */
game.get = function (path)
{
    let array = path.split(".")
    let parent_md = null
    for (let i = 0, len = array.length; i < len; ++i)
    {
        let md_name = array[i]
        let this_md = null

        if (parent_md)
        {
            this_md = parent_md.subs[md_name]
        }
        else
        {
            this_md = game.modules[md_name]
        }

        parent_md = this_md
    }

    return parent_md
}

/**
 * 
 * @param {模块名称} name 
 */
game.get_data = function (name)
{
    let md = game.get(name)
    return md.data
}

/**
 * 获得指定模块的所有子模块
 * @param {指定模块的名称} name 
 */
game.get_subs = function (name)
{
    let md = game.get(name)
    return md.subs
}

game.__ctor = function (md, data)
{
    if (md.__super)
    {
        game.__ctor(md.__super, data)
    }

    md.ctor(data)
}
/**
 * 每次的创建都必须是叶子节点
 * @param {*} name 
 * @param {*} parent 
 */
game.__new_md = function (path, parent)
{
    let array = path.split(".")
    let name = array[array.length - 1]

    let md = game.__create_md(name, parent)
    let parent_md = null

    for (let i = 0, len = array.length - 1; i < len; ++i)
    {
        let md_name = array[i]
        let this_md = null

        if (parent_md)
        {
            this_md = parent_md.subs[md_name]
        }
        else
        {
            this_md = game.modules[md_name]
        }

        if (this_md == null)        //
        {
            return
        }

        parent_md = this_md
    }

    md.path = path

    if (parent_md == null)
    {
        game.modules[name] = md
        game.sorted_mds.push(md)
    }
    else
    {
        parent_md.subs[name] = md
    }

    return md
}

game.__create_md = function (name, parent)
{
    let define = function () { }

    define.prototype = parent

    let md = new define()

    md.subs = {}
    md.name = name

    md.__define = define
    md.__super = parent

    return md
}

game.init = async function ()
{
    if (await game.init_modules() == false)
    {
        return false
    }
    return true
}

game.start = async function ()
{
    if (await game.start_modules() == false)
    {
        return false
    }
    return true
}

game.init_modules = async function ()
{
    for (var i = 0; i < game.sorted_mds.length; ++i)
    {
        let that = game.sorted_mds[i]

        if (that.init != null)
        {
            let ret = await that.init()
            if (ret == false)
            {
                logs(`init -- ${that.name} failed`)

                return false
            }
        }
    }

    logs("init all modules ok")

    return true
}

game.start_modules = async function ()
{
    for (var i = 0; i < game.sorted_mds.length; ++i)
    {
        let that = game.sorted_mds[i]

        if (that.start != null)
        {
            let ret = await that.start()
            if (ret == false)
            {
                logs(`starting -- ${that.name} failed`)
                return false
            }
        }
    }

    logs("start all modules")

    return true
}

game.wrap = function (module_name, func_name)
{
    let module = typeof (module_name) == "string" ? game.get(module_name) : module_name

    return async function (...args)
    {
        return module[func_name](...args)
    }
}