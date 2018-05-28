module.exports = {
    site : "http://bansky.mustbe.cool",
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