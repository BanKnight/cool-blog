const debug = require('debug')('art-template');
const template = require('art-template');
const fs = require("fs")
const path = require("path")

const defaultSettings = {
    debug: process.env.NODE_ENV !== 'production',
    writeResp: true
};

/**
 * set app.context.render
 * @param {Application} app      koa application instance
 * @param {Object}      settings user settings
 */
exports = module.exports = function (app, settings = {}) {
    if (app.context.render) {
        return;
    }

    settings = Object.assign({}, defaultSettings, settings);
    if(Array.isArray(settings.pathes) == false)
    {
        settings.pathes = [settings.pathes]
    }

    function render(filename, data) {

        for(var i = 0;i < settings.pathes.length;++i)
        {
            var one_path = settings.pathes[i]

            var full_path = path.resolve(one_path,filename) + ".art"

            //console.log(`finding ....${full_path},${one_path},${filename}`)

            if(fs.existsSync(full_path) == true)
            {
                debug(`render: ${filename}`);
                settings.filename = full_path;
                const render = template.compile(settings);
                return render(data);
            }
        }

        throw "now such file:" + filename
    }


    app.context.render = function (view, _context) {
        const ctx = this;
        const context = Object.assign({}, ctx.state, _context);
        const html = render(view, context);
        const writeResp = context.writeResp === false ? false : (context.writeResp || settings.writeResp);

        if (writeResp) {
            ctx.type = 'html';
            ctx.body = html;
        } else {
            return html;
        }

    };
};


exports.template = template;