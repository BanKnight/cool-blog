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

