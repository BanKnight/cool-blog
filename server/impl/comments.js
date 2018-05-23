const assert = require('assert')
const uuid = require("uuid")

const server = require("../head")

const me = server.modules.comments
const data = me.data

const md_db = server.modules.db

me.start = async function()
{
    let db_comments = await md_db.load("comments",{})
    for(var i = 0,len = db_comments.length;i < len;++i)
    {
        var db_one = db_comments[i]

        db_one.id = db_one._id
        delete db_one._id

        let that_comments = data[db_one.post]
        if(that_comments == null)
        {
            that_comments = {sort:[],keys:{}}
            data[db_one.post] = that_comments
        }

        that_comments.sort.push(db_one)
        that_comments.keys[db_one.id] = db_one
    }

    console.log(`finish loading comments:${db_comments.length}`)

    for(var post_key in data)
    {
        var that_comments = data[post_key]

        that_comments.sort.sort(me.compare)
    }

    return true
}

me.compare = function(first,second)
{
    return first.id - second.id
}

me.get_through_page = function(post_id,page_no,max_number_in_page)
{
    var that_comments = data[post_id]
    if(that_comments == null)
    {
        return {curr_page:1,max_page:1,page:[]}
    }
    if(that_comments.sort.length == 0)
    {
        return {curr_page:1,max_page:1,page:[]}
    }

    page_no = page_no || 1
    max_number_in_page = max_number_in_page || 10

    const page = []
    const that_all = that_comments.sort
    const total_count = that_all.length

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

    let start_index = (page_no - 1) * max_number_in_page
    let stop_index = start_index + max_number_in_page

    if(page_no == total_page)
    {
        stop_index = start_index + last_page_count
    }

    for(var i = start_index;i < stop_index;++i)
    {
        page.push(that_all[i])
    }

    console.log(`start_index:${start_index} stop_index:${stop_index},curr_page:${page_no},max_page:${total_page}`)

    return {curr_page:page_no,max_page:total_page,page:page}
}

me.get = function(post_id,id)
{
    var that_comments = data[post_id]
    if(that_comments == null)
    {
        return
    }
    return that_comments.keys[id]
}

me.new = async function(post_id,comment)
{
    assert(comment.author)
    assert(comment.content)
    assert(comment.content.length >= 3)

    comment.id = uuid.v1()
    comment.post = post_id
    comment.create = Date.now()

    let that_comments = data[post_id]
    if(that_comments == null)
    {
        that_comments = {sort:[],keys:{}}
        data[post_id] = that_comments
    }

    that_comments.sort.push(comment)
    that_comments.keys[comment.id] = comment

    const db_one = {
        author : comment.author,
        website : comment.website,
        email : comment.email,
        content : comment.content,
        post : post_id,
        create : comment.create,
        reply : comment.reply,
    }

    await md_db.upsert("comments",{_id : comment.id},db_one)

    return comment
}

me.destroy = async function(comment)
{
    comment.is_destroy = true

    const db_one = {
        is_destroy : true,
    }

    await md_db.upsert("comments",{_id : comment.id},db_one)
}

me.change = async function(old_post_id,new_post_id)
{
    const that_comments = data[old_post_id]
    if(that_comments == null)
    {
        return
    }

    delete data[post_id]

    for(var i = 0,len = that_comments.sort.length;i < len;++i)
    {
        const comment = that_comments.sort[i]
        comment.post = new_post_id
    }

    data[new_post_id] = that_comments

    await md_db.upsert("comments",{post : old_post_id},{post:new_post_id})
}

