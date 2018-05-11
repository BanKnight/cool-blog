const handlebars = require("handlebars").create()

const body = `
<!DOCTYPE html>
<html lang="en">
<head>
    {{>p header}}
</head>
<body>
    {{>p footer}}
</body>
</html>
`

const files = {
    header:`<title>this is {{title}}</title>`,
    footer:`<script id = {{footer}} />`,
}

const tpl_body = handlebars.compile(body)

handlebars.registerPartial("p",function(name)
{
    return files[name]
})

const html = tpl_body({title:"this is a title",footer:132})

console.log(html)