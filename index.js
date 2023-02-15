const express = require('express')
const session = require('express-session')
require('dotenv').config()
const mongoose = require('mongoose')

const app = express()

const passport = require('passport')
const { strategyLogin, strategySignup } = require('./src/middleware/passportLocal.js')

passport.use('login', strategyLogin);
passport.use('signup', strategySignup)

const { routesProducts } = require('./src/routes/products/routesProducts')
const { routesCart} = require('./src/routes/cart/routesCart')
const { routesAuth } = require('./src/routes/routes')
const sendEmail = require('./src/utils/nodemailer.js')
const sendSMS = require('./src/utils/twilioSMS.js')
const sendWhatsapp = require('./src/utils/twilioWsp.js')
const { IpAddressContextImpl } = require('twilio/lib/rest/api/v2010/account/sip/ipAccessControlList/ipAddress.js')

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: Number(process.env.TIEMPO_EXPIRACION)
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', routesAuth)
app.use('/products', routesProducts)
app.use('/cart', routesCart)


app.all('*', (req, res) => {
    res.status(404).json({
        error: -2 , 
        descripcion: `Ruta: ${req.originalUrl} Metodo: ${req.method} no implementada`
    })
})

sendEmail()
sendSMS()
sendWhatsapp()
    
module.exports = app










