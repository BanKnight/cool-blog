module.exports = {
    port:80,
    content:"./content",
    theme:"maupassant",
    db:{host:"127.0.0.1",port:27017,db:"blog"},
    user:{name:"123456789@163.com",pass:"65432"},
    mail_sender:{
        service: '163',
        //smtp服务器的端口
        port: 465,   // SMTP 端口
        secureConnection: true,   // 使用 SSL
        auth: {
            user: '123456789@163.com',
            //这里密码不是qq密码，是你设置的smtp密码
            pass: '654321'
        }
    },
    mail_recv:"123456789@163.com",
}