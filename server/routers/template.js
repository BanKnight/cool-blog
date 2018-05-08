const views = require("koa-views")
const path = require("path")

const config = require("../../config")
const server = require("../head")

const app = server.app

let views_path = path.join(config.content,"themes","cool")

views_path = path.resolve(views_path)

console.log(`views path is ${views_path}`)

app.use(views(views_path,{extension: 'hbs', map: {hbs: 'handlebars'}}))