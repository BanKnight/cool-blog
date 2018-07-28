const fs = require("fs")
const path = require("path")

const blacks = ['index']

global.required = async (dir) =>
{
    const file_or_folders = fs.readdirSync(dir)

    file_or_folders.forEach(element =>
    {
        let base_name = path.basename(element, ".js")
        if (blacks.includes(base_name) == false)
        {
            require(path.join(dir, base_name))
        }
    });
}

var assert = global.assert = function (cond, msg)
{
    if (cond)
    {
        return cond
    }

    if (msg)
    {
        throw new Error(msg)
    }

    throw new Error("cond must be true")
}

var shallow_copy = global.shallow_copy = function (from)
{
    let typeinfo = typeof (from)
    if (typeinfo != "object")
    {
        return from
    }

    if (from instanceof Array)
    {
        return Object.assign([], from)
    }

    return Object.assign({}, from)
}

/**
 * 相对cwd 开始查找路径,然后开始require
 */
var include = global.include = function (name)
{
    return require(path.resolve(process.cwd(), name))
}

var noop = global.noop = function () { }

var mirror = global.mirror = function (arg) { return arg }