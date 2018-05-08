'use strict';

require("./kernel")

const server = require("./server")

if(server.start() == false)
{
    console.log("start server error")
}
 

