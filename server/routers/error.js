const handle_err = require('koa-handle-error')

const server = require("../head")
const app = server.app

app.use(handle_err(server.on_err))      //错误捕捉


