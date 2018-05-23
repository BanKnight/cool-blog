var post_box_html = `<div class="isso-postbox">
    <div class="form-wrapper">
        <div class="textarea-wrapper">
            <div contenteditable="true" name="content" class="textarea placeholder"></div>
        </div>
        <section class="auth-section">
            <p class="input-wrapper">
                <input type="text" name="author" placeholder="名字" value="">
            </p>
            <p class="input-wrapper">
                <input type="email" name="email" placeholder="E-mail (可选)" value="">
            </p>
            <p class="input-wrapper">
                <input type="text" name="website" placeholder="网站 (可选)" value="">
            </p>
            <p class="post-action">
                <input type="submit" value="提交">
            </p>
        </section>
    </div>
</div>`

$(document).ready(function () {
    var thread = $("#isso-thread")
    if (thread == null) {
        return
    }

    var post_id = thread.attr("post")
    if (post_id == null) {
        return
    }

    thread.append(post_box_html)

    thread.append('<div id="isso-root"></div>')

    const el = $("div.isso-postbox")[0]

    el.content = $("[name='content']", el)[0]
    el.author = $("[name='author']", el)[0]
    el.website = $("[name='website']", el)[0]
    el.email = $("[name='email']", el)[0]

    //console.log(el.innerHTML)

    el.validate = function () {

        if (this.content.innerHTML.trim().length < 3) {
            this.content.focus()
            return false
        }
        if (this.author.value.trim().length <= 0) {
            this.author.focus()
            return false;
        }
        return true;
    };

    const comment_box = $("#isso-root")

    function add_one_comment(comment)
    {
        comment_box.prepend(`<div class="isso-comment">
        <div class="text-wrapper">
            <div role="meta" class="isso-comment-header">
                <a href="${comment.website}" rel="external nofollow" target="_blank" class="author">${comment.author}</a>
                <span class="spacer">•</span>
                <a href="#isso-2" class="permalink">
                    <time>${comment.create}</time>
                </a>
            </div>
            <div class="text">
                <p>${comment.content}</p>
            </div>
        </div>
        </div>
        `)
    }

    //按钮点击事件
    $("[type=submit]", el).on("click", function () {
        if (!el.validate()) {
            return;
        }

        let data = {
            author:el.author.value.trim(),
            email:el.email.value.trim(),
            website:el.website.value.trim(),
            content:el.content.innerHTML.trim(),
        }

        $.post(`/comments/${post_id}`,data,function(data)
        {
            if(data.result == true)
            {
                add_one_comment(data.comment)
            }

        },'json')
    })

    function on_page_back(result) 
    {
        console.dir(result)

        for (var i = result.page.length - 1; i >= 0; --i) 
        {
            var comment = result.page[i]

            add_one_comment(comment)
            
        }
    }
    //获取数据
    $.get(`/comments/${post_id}/1`, on_page_back)
});