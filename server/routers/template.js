const path = require("path")
const assert = require("assert")
const Remarkable = require('remarkable')
var hljs  = require('highlight.js') // https://highlightjs.org/

const render = require("koa-art-template")
const template = render.template

const config = require("../../config")
const server = require("../head")

const app = server.app


{
// Actual default values
    var md = new Remarkable({
        html:         true, 
        highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
            return hljs.highlight(lang, str).value;
            } catch (err) {}
        }
    
        try {
            return hljs.highlightAuto(str).value;
        } catch (err) {}
    
        return ''; // use external default escaping
        }
    });

  template.defaults.imports.md = function(content)
  {
    return md.render(content)
  }
}

{
    let views_path = path.join(config.content,"themes","cool")

    views_path = path.resolve(views_path)

    console.log(`views path is ${views_path}`)

    render(app, {
        root: views_path,
        extname: '.art',
        debug: process.env.NODE_ENV !== 'production'
    })
}







