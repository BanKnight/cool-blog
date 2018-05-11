const handlebars = require("handlebars").create()

const body = `
<!DOCTYPE html>
<html lang="en">
<head>
    {{>header}}
</head>
<body>
    {{>footer}}
</body>
</html>
`
const header = `<title>this is {{title}}</title>`

const footer = `<script id = {{footer}} />`

const tpl_body = handlebars.compile(body)
const tpl_header = handlebars.compile(header)
const tpl_footer = handlebars.compile(footer)

handlebars.registerPartial("header",tpl_header)
handlebars.registerPartial("footer",tpl_footer)

const html = tpl_body({title:"this is a title",footer:132})

console.log(html)