const path = require("path")
const render = require("koa-art-template")
const template = render.template

const config = require("../../config")
const server = require("../head")

const app = server.app

let views_path = path.join(config.content,"themes","cool")

views_path = path.resolve(views_path)

console.log(`views path is ${views_path}`)

render(app, {
    root: views_path,
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production'
  });
