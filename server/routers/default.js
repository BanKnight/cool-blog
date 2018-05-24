const helmet = require('koa-helmet')
const limit = require('koa-limit')

const server = require("../head")
const app = server.app

//1分钟限制用户访问不超过1000次
app.proxy = true    
app.use(limit({
    limit: 1000,
    interval: 1000 * 60
  }))

app.use(helmet.noCache())           //浏览器不要缓存
app.use(helmet.noSniff())           
app.use(helmet.frameguard())         
app.use(helmet.xssFilter())         
app.use(helmet.hidePoweredBy())     //      删除了 header 中的 X-Powered-By 标签
app.use(helmet.ieNoOpen())




