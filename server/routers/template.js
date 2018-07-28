const path = require("path")
const assert = require("assert")
const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js') // https://highlightjs.org/
const moment = require("moment")

const render = include("./kernel/middleware/views")
const template = render.template

const config = include("./config")
const logs = global.logs("template")

const server = global.server

const app = server.app

{
    // Actual default values
    var md = new MarkdownIt({
        html: true,
        highlight: function (str, lang)
        {
            if (lang && hljs.getLanguage(lang))
            {
                try
                {
                    return hljs.highlight(lang, str).value;
                } catch (err) { }
            }

            try
            {
                return hljs.highlightAuto(str).value;
            } catch (err) { }

            return ''; // use external default escaping
        }
    });

    template.defaults.imports.md = function (content)
    {
        return md.render(content)
    }

    template.defaults.imports.moment = function (content, format_str)
    {
        return moment(content).format(format_str)
    }
}

{
    let views_path = path.resolve(config.content, "themes", config.theme || "cool")
    let admin_path = path.resolve("admin")

    logs.debug(`views path is ${views_path}`)

    render(app, {
        pathes: [views_path, admin_path],
        extname: '.art',
        debug: process.env.NODE_ENV !== 'production'
    })
}







