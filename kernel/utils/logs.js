var colors = require('colors/safe')

let log = console.log
let error = console.error

let all_logs = {}

let levels = {
    all: 0,
    debug: 1,
    info: 2,        //2
    warn: 3,
    error: 4,          //4
    fatal: 5,
    off: 6,            //6
}

let curr_level = levels.all
let this_prefix = ""

let logs = global.logs = module.exports = function (name)
{
    let exists = all_logs[name]
    if (exists)
    {
        return exists
    }
    //level info
    exists = function (content)
    {
        if (!exists.enabled)
        {
            return
        }
        if (levels.info > curr_level)
        {
            log(`${this_prefix} (${name}) ${content}`)
        }
    }
    exists.enabled = true

    exists.debug = function (content)
    {
        if (!exists.enabled)
        {
            return
        }
        if (levels.debug > curr_level)
        {
            log(colors.blue(`${this_prefix} (${name}) ${content}`))
        }
    }
    exists.warn = function (content)
    {
        if (!exists.enabled)
        {
            return
        }
        if (levels.warn > curr_level)
        {
            log(colors.yellow(`${this_prefix} (${name}) ${content}`))
        }
    }
    exists.error = function (content)
    {
        if (!exists.enabled)
        {
            return
        }
        if (levels.error > curr_level)
        {
            error(colors.underline.red(`${this_prefix} (${name}) ${content}`))
        }
    }
    exists.fatal = function (content)
    {
        if (!exists.enabled)
        {
            return
        }
        if (levels.fatal > curr_level)
        {
            error(colors.bold.red(`${this_prefix} (${name}) ${content}`))
        }
    }

    return exists
}

logs.set_level = function (level_name)
{
    curr_level = levels[level_name]
}

logs.enable = function (name, enabled)
{
    let this_log = all_logs[name]
    if (this_log == null)
    {
        return
    }
    this_log.enabled = enabled
}

logs.prefix = function (prefix)
{
    this_prefix = prefix
}

