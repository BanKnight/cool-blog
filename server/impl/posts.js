const moment = require("moment")
const assert = require("assert")

const server = require("../head")

const me = server.modules.posts
const data = me.data

me.start = async function()
{
    const posts = data.posts
    const posts_sorted = data.posts_sorted     //最新的在前面

    for(var i = 100;i >= 98;--i)
    {
        const post = {}

        post.id = i
        post.url = `/post/${i}`
        post.title = `标题${i}`
        post.summary = `概要${i}`
        post.content = `内容${i}`

        posts[post.id] = post
        posts_sorted.push(post)
    }

    data.last_id_time = parseInt(moment().format("YYYYMMDDHHmmss"))
    data.id_helper = 0
}

me.get_posts_by_page = function(page_no)
{
    page_no = page_no || 1

    const posts_sorted = data.posts_sorted
    const total_count = posts_sorted.length
    const max_number_in_page = 5

    if(total_count == 0)
    {
        return []
    }

    let total_page = total_count / max_number_in_page
    let last_page_count = total_count % max_number_in_page
    
    if(last_page_count > 0)
    {
        total_page = total_page + 1
    }
    else
    {
        last_page_count = max_number_in_page
    }

    page_no = Math.min(page_no,total_page)
    page_no = Math.max(page_no,1)

    let page = []
    let start_index = (page_no - 1) * max_number_in_page
    let stop_index = start_index + max_number_in_page

    if(page_no == total_page)
    {
        stop_index = start_index + last_page_count
    }

    for(var i = start_index;i < stop_index;++i)
    {
        page.push(posts_sorted[i])
    }

    console.log(`start_index:${start_index} stop_index:${stop_index}`)

    return page
}

me.get_post = async function(id)
{
    const posts = data.posts

    return posts[id]
}

me.new_id = ()=>
{
    var now_int = parseInt(moment().format("YYYYMMDDHHmmss"))

    if(now_int != data.last_id_time)
    {
        data.last_id_time = now_int
        data.id_helper = 0
    }

    data.id_helper = data.id_helper + 1

    const id = data.last_id_time * 100 + data.id_helper

    console.log(`id helper is:${data.last_id_time}-${data.id_helper},${id}`)

    return id
}

me.new_post = async(post)=>
{
    assert(post.title)
    assert(post.content)
    assert(post.summary)

    post.id = me.new_id()
    post.url = `/post/${post.id}`
    post.create = Date.now()

    data.posts[post.id] = post
    data.posts_sorted.unshift(post)

    return post
}