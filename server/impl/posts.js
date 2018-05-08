const moment = require("moment")
const assert = require("assert")

const server = require("../head")

const me = server.modules.posts
const data = me.data

const md_db = server.modules.db

me.start = async function()
{

    const posts = data.posts
    const posts_sorted = data.posts_sorted     //最新的在前面

    const all_posts = await md_db.load("posts",{})

    all_posts.forEach(db_post => {
        
        const post = {}

        post.id = db_post._id
        post.create = db_post.create
        post.url = `/post/${post.id}`
        post.title = db_post.title
        post.summary = db_post.summary
        post.content = db_post.content

        posts[post.id] = post
        posts_sorted.push(post)
    })

    me.sort_posts()

    data.last_id_time = parseInt(moment().format("YYYYMMDDHHmmss"))
    data.id_helper = 0

    console.log(`has already load ${all_posts.length} posts`)
}

function compare(first,second)
{
    return second.id - first.id
}

me.sort_posts = function()
{
    data.posts_sorted.sort(compare)
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

    let total_page = Math.floor(total_count / max_number_in_page)
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

    const db_post = {
        _id:post.id,
        create : post.create,
        title : post.title,
        summary : post.summary,
        content : post.content,
    }
    
    md_db.upsert("posts",{_id:post.id},db_post)

    return post
}

me.del_post = async(id)=>
{
    const is_exists = delete data.posts[id]

    if(!is_exists)
    {
        return false
    }

    for(var i = 0,len = data.posts_sorted.length;i < len;++i)
    {
        const post = data.posts_sorted[i]
        if(post.id != id)
        {
            continue
        }

        data.posts_sorted.splice(i,1)

        await md_db.remove("posts",{_id:id})

        return true
    }

    return false
}