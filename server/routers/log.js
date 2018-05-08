const server = require("../head")
const app = server.app

app.use(server.on_log)                 //日志记录
