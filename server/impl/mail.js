const mailer = require("nodemailer")
const logs = global.logs("mail")

const config = include("./config")

const server = global.server

const me = server.get("mail")
const data = me.data

me.start = async function ()
{
    data.transporter = mailer.createTransport(config.mail_sender)

    return true
}

me.send = function (subject, text)
{
    logs.debug(`send mail:${text}`)

    const option = {
        from: config.mail_sender.auth.user,
        to: config.mail_accepter,
        subject: subject,
        text: text,
    }

    data.transporter.sendMail(option, function (err, info)
    {
        if (err)
        {
            return logs.debug(err);
        }
        logs.debug('Message sent: %s', info.messageId);
    })
}