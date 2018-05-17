const path = require("path")
const assert = require("assert")
const Remarkable = require('remarkable')
const hljs  = require('highlight.js') // https://highlightjs.org/
const moment = require("moment")

const render = require("../../kernel/views")
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

  template.defaults.imports.moment = function(content,format_str)
  {
      return moment(content).format(format_str)
  }
}

{
    let views_path = path.resolve(config.content,"themes",config.theme || "cool")
    let admin_path = path.resolve("admin")

    console.log(`views path is ${views_path}`)

    render(app, {
        pathes: [views_path,admin_path],
        extname: '.art',
        debug: process.env.NODE_ENV !== 'production'
    })
}







