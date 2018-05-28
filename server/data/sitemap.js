const md = {
    data : {},
    priority:99,
}

module.exports = md

const data = md.data

data.urls = {
    version : 0,
    content : {},           //各种连接
}              
data.txt = {
    version : 0,            
    content : "",           //生成的内容
}

data.robots = {
    version : 0,
    content : "",
}