'use strict';

require("./kernel")

const server = require("./server")

async function start()
{
    if(await server.start() == false)
    {
        console.log("start server error")
    }
}

start()




 

