const game = require("./head")
const me = game.get("timers")

me.run_after = function (delay, cb)
{
    return {
        method: "after",
        id: setTimeout(cb, delay),
    }
}

me.run_every = function (interval, cb)
{
    return {
        method: "every",
        id: setInterval(cb, interval)
    }
}

me.remove = function (info)
{
    switch (info.method)
    {
        case "revery":
            clearInterval(info.id)
            break
        default:
            clearTimeout(info.id)
            break
    }
}

game.run_after = me.run_after
game.run_every = me.run_every
game.remove_timer = me.remove

game.sleep = async function (delay)
{
    return new Promise((resolve) =>
    {
        me.run_after(delay, () =>
        {
            resolve()
        })
    })
}
