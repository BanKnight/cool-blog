const moment = require("moment")
const logs = global.logs("posts")

const server = global.server

const md_db = server.get("db")
const md_sitemap = server.get("sitemap")

const me = server.get("posts")
const data = me.data

me.start = async function ()
{
    const posts = data.posts
    const posts_sorted = data.posts_sorted     //最新的在前面

    const all_posts = await md_db.load("posts", {})

    all_posts.forEach(db_post =>
    {

        const post = {}

        post.id = db_post._id
        post.create = db_post.create
        post.title = db_post.title
        post.summary = db_post.summary
        post.content = db_post.content

        posts[post.id] = post

        if (post.static == true)
        {
            data.static_posts[post.id] = post
        }
        else
        {
            posts_sorted.push(post)
        }

        md_sitemap.set_url(`/post/${post.id}`)
    })

    me.sort_posts()

    data.last_id_time = parseInt(moment().format("YYYYMMDDHHmmss"))
    data.id_helper = 0

    logs.debug(`has already load ${all_posts.length} posts`)
}

function compare(first, second)
{
    return second.create - first.create
}

me.sort_posts = function ()
{
    data.posts_sorted.sort(compare)
}

me.get_posts_by_page = function (page_no, max_number_in_page)
{
    page_no = page_no || 1

    const page = []

    const posts_sorted = data.posts_sorted
    const total_count = posts_sorted.length

    max_number_in_page = max_number_in_page || 5

    if (total_count == 0)
    {
        return { curr_page: 1, max_page: 1, page: page }
    }

    let total_page = Math.floor(total_count / max_number_in_page)
    let last_page_count = total_count % max_number_in_page

    if (last_page_count > 0)
    {
        total_page = total_page + 1
    }
    else
    {
        last_page_count = max_number_in_page
    }

    page_no = Math.min(page_no, total_page)
    page_no = Math.max(page_no, 1)

    let start_index = (page_no - 1) * max_number_in_page
    let stop_index = start_index + max_number_in_page

    if (page_no == total_page)
    {
        stop_index = start_index + last_page_count
    }

    for (var i = start_index; i < stop_index; ++i)
    {
        page.push(posts_sorted[i])
    }

    logs.debug(`start_index:${start_index} stop_index:${stop_index}`)

    return { curr_page: page_no, max_page: total_page, page: page }
}

me.get_post = async function (id)
{
    const posts = data.posts

    return posts[id]
}

me.new_post = async (post) =>
{
    assert(post.title)
    assert(post.content)
    // assert(post.summary)

    assert(data.posts[post.id] == null, "you can't create a post when it's id is already exist")

    post.create = Date.now()

    data.posts[post.id] = post
    data.posts_sorted.unshift(post)

    if (post.static == true)
    {
        data.static_posts[post.id] = post
    }

    const db_post = {
        _id: post.id,
        create: post.create,
        title: post.title,
        summary: post.summary,
        content: post.content,
    }

    logs.debug(`new a post,id:${post.id},url:${post.url},title:${post.title}`)

    md_db.upsert("posts", { _id: post.id }, db_post)

    return post
}

me.del_post = async (id) =>
{
    const is_exists = delete data.posts[id]

    if (!is_exists)
    {
        return false
    }

    for (var i = 0, len = data.posts_sorted.length; i < len; ++i)
    {
        const post = data.posts_sorted[i]
        if (post.id != id)
        {
            continue
        }

        data.posts_sorted.splice(i, 1)

        if (post.static == true)
        {
            delete data.static_posts[id]
        }

        await md_db.remove("posts", { _id: id })

        return true
    }

    return false
}

me.del_from_static = function (id)
{
    delete data.static_posts[id]
}

me.upd_post = async (post, old_id) =>
{
    if (old_id != null)
    {
        let is_existed = delete data.posts[old_id]

        if (is_existed)
        {
            data.posts[post.id] = post
        }
    }

    const db_post = {
        create: post.create,
        title: post.title,
        summary: post.summary,
        content: post.content,
        static: post.static,
    }

    logs.debug(`upd a post,id:${post.id},title:${post.title}`)

    md_db.upsert("posts", { _id: post.id }, db_post)
}