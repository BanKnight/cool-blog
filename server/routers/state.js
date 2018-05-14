const server = require("../head")
const app = server.app
const md_basic = server.modules.basic

app.use(md_basic.mount_state)                 //日志记录
