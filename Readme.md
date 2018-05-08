# coolblog
a super cool blog

## 特性
+ nodejs
+ 评论
+ 搜索
+ seo

## routers
//---------------------------------------------
```javascript
let routers = {}

routers.use(err_router)
routers.use(log_router)

//---------------------------------------------
routers.get("/",cache_router,front_end.on_home_page)
routers.get("/posts",cache_router,front_end.on_posts_page)
routers.get("/posts/:page",cache_router,front_end.on_posts_page)

routers.get("/post/:id",cache_router,front_end.on_one_post_page)
routers.get("/post/:id/comments",cache_router,front_end.on_get_comment_page)
routers.put("/post/:id/comments",cache_router,front_end.on_new_comment_page)
//---------------------------------------------
routers.get("/admin",login_router,front_end.on_admin_page)
routers.post("/admin/login",login_router,front_end.on_admin_login_page)
routers.post("/admin/regist",login_router,front_end.on_admin_regist_page)
//---------------------------------------------
routers.get("/admin/posts",login_router,front_end.on_admin_posts_page)
routers.get("/admn/posts/:id",login_router,front_end.on_admin_read_post_page)
routers.put("/admn/posts/:id",login_router,front_end.on_admin_new_post_page)
routers.post("/admn/posts/:id",login_router,front_end.on_admin_edit_post_page)
routers.del("/admn/posts/:id",login_router,front_end.on_admin_del_post_page)
```