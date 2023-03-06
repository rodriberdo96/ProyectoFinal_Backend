const {createTransport} = require('nodemailer')
const nodeMailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

const sendEmail = async () =>  {
    
    const MAIL = process.env.TEST_MAIL
    const PASSW = process.env.PASS

    const transporter = createTransport({
        service: 'gmail',
        port: 587,
        secure: true,
        auth: {
            user: MAIL,
            pass: PASSW
        }
    })
    
    const mailOptions = {
        from: MAIL,
        to: 'rodriberdomas@gmail.com',
        subject: 'Mail de prueba desde Node.js',
        html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color:green">Node.js con Nodemailer</span></h1>'
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(info)
}

module.exports = sendEmail