const assert = require('assert')
const mailer = require("nodemailer")

const config = require("../../config")
const server = require("../head")

const me = server.modules.mail
const data = me.data

me.start = async function()
{
    data.transporter = mailer.createTransport(config.mail_sender)

    return true
}

me.send = function(subject,text)
{
    const option = {
        from : 'noreply@cool-blog',
        to : config.mail_accepter,
        subject : subject,
        text : text,
    }

    data.transporter.sendMail(option,function(err,info)
    {
        if (err) {
            return console.log(err);
          }
          console.log('Message sent: %s', info.messageId);
    })
}