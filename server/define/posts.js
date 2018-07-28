server.define("posts", {
    ctor: (data) =>
    {
        data.posts = {}
        data.posts_sorted = []
        data.static_posts = {}           //static post
    }
})