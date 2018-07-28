server.define("sitemap", {
    ctor: (data) =>
    {

        data.urls = {
            version: 0,
            content: {},           //各种连接
        }
        data.txt = {
            version: 0,
            content: "",           //生成的内容
        }

        data.robots = {
            version: 0,
            content: "",
        }

    }
})