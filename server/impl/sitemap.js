const moment = require("moment")
const assert = require("assert")

const config = require("../../config")
const server = require("../head")

const me = server.modules.sitemap
const data = me.data

me.start = function()
{

}

me.get_txt = function()
{
    me.try_update()

    return data.txt.content
}

me.get_robots = function()
{
    me.try_update()

    return data.robots.content
}

me.set_url = function(url)
{
    if(data.urls.content[url] != null)
    {
        return
    }

    data.urls.content[url] = true
    data.urls.version ++
}

me.try_update = function()
{
    me.try_update_sitemap()
    me.try_update_robots()
}

me.try_update_sitemap = function()
{
    if(data.urls.version == data.txt.version)
    {
        return
    }

    const buffer = Buffer.alloc(10 * 1024 * 1024)
    let size = 0

    for(var url in data.urls.content)
    {
        var real = `${config.site}${url}\n` 
        buffer.write(real,size,real.length,"utf8")

        size += real.length
    }

    data.txt.content = buffer.toString("utf8",0,size)
    data.txt.version = data.urls.version
}

me.try_update_robots = function()
{
    if(data.urls.version == data.robots.version)
    {
        return
    }

    const buffer = Buffer.alloc(10 * 1024 * 1024)
    let size = 0

    {
        let real = `User-agent:*\n`
        size += buffer.write(real,size,real.length,"utf8")

        real = `Disallow:/admin/\n`
        size += buffer.write(real,size,real.length,"utf8")

        real = `Disallow:/public/\n`
        size += buffer.write(real,size,real.length,"utf8")

        real = `Disallow:/*.js$\n`
        size += buffer.write(real,size,real.length,"utf8")

        real = `Disallow:/*.css$\n`
        size += buffer.write(real,size,real.length,"utf8")

        real = `Disallow:/*.png$\n`
        size += buffer.write(real,size,real.length,"utf8")

        real = `Disallow:/*.jpg$\n`
        size += buffer.write(real,size,real.length,"utf8")

        real = `Disallow:/*.jpeg$\n`
        size += buffer.write(real,size,real.length,"utf8")
    }

    data.robots.content = buffer.toString("utf8",0,size)
    data.robots.version = data.urls.version
}

me.push = async function(url)
{
    if(config.baidu == null)
    {
        return
    }

    return new Promise((resolve,reject)=>
    {
        request({
            url: config.baidu,
            method: 'POST',
            headers:{
                "content-type":"text/plain",
            },
            body: `${config.site}${url}\n`
        },function(error, response, body)
        {
            if (!error && response.statusCode == 200) 
            {
                resolve()
            }
            else
            {
                reject(error)
            }
        })
    })
}

