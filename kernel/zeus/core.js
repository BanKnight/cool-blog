
const head = require("./head")

head.define("timers")

head.define("event", {
    ctor: function (data)
    {
        data.listen = {}
        data.triging = 0
    },
})

