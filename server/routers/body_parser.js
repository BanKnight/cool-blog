var bodyParser = require('koa-bodyparser')

const server = require("../head")
const app = server.app

app.use(bodyParser())