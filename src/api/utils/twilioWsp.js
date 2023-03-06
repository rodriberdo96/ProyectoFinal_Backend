
const twilio = require('twilio')

const sendWhatsapp = async () =>  {
    
    const accountSid = process.env.ACCOUNTSID
    const authToken = process.env.AUTHTOKEN
    
    const client = twilio(accountSid, authToken)
    
    try {
        const message = await client.messages.create({
            body: 'Probando mandar wsp desde Twilio',
            from: 'whatsapp:'+ process.env.TWILIOPHONEWSP,
            to: 'whatsapp:'+ process.env.MYPHONEWSP 
        })
        console.log(message)
    } catch (error) {
        console.log(error)
    }
}

module.exports =  sendWhatsapp