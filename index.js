require("./kernel/utils")

let server = global.server = include("./kernel/zeus")

require("./server")

async function start()
{
    if (await server.init() == false)
    {
        console.error("init server error")
    }

    if (await server.start() == false)
    {
        console.error("start server error")
    }
}

start()






