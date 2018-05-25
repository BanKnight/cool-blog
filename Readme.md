## cool-blog
一个用nodejs开发的轻量级博客,使用例子：[BanSky](http://bansky.mustbe.cool)

## 安装
+ 安装并启动mongodb,[官网](https://docs.mongodb.com/v3.6/administration/install-community/)
+ 安装 nodejs,[官网](https://nodejs.org/en/)
+ 安装 forever
```shell
 install forever -g
 ```
+ 启动

```shell
cd 代码目录
npm install
npm test    # 如果是正式环境，使用npm start
```

## 配置
开发配置 config/development，
正式配置 config/production
```js
module.exports = {
    port:80,
    content:"./content",
    theme:"maupassant",
    db:{host:"127.0.0.1",port:27017,db:"blog"}, //数据链接信息
    user:{name:"123456789@163.com",pass:"65432"},   //后台管理员登陆用
    mail_sender:{                                   //邮件通知用到的信息
        service: '163',
        //smtp服务器的端口
        port: 465,   // SMTP 端口
        secureConnection: true,   // 使用 SSL
        auth: {
            user: '123456789@163.com',
            //这里密码不是邮箱密码，是你设置的smtp密码
            pass: '654321'
        }
    },
    mail_accepter:"123456789@163.com",              //收邮件的人
}
```

## RoadMap
### 完成的部分
+ 首页
+ 浏览文章
+ 编辑文章
+ 删除文章
+ 评论
+ 基本的安全检查
+ 邮件通知
+ 关于

### 待完成的部分

+ 统计
+ 分类
+ 标签
+ 置顶
+ seo优化
+ 待补充

## 重要时刻
以下记录站的重要时刻，使用倒序方式
+ 2018-05-24 添加评论 
+ 2018-05-21 正式上线 

