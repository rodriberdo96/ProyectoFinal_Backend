const admin = require('firebase-admin');
const serviceAccount = require('./firebase.json');
const fs = require('fs');

const serviceAccount= JSON.parse(fs.readFileSync('../db/serviceAccountKey.json', 'utf-8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://back-end-proyecto-final.firebaseio.com"
});

console.log('Firebase conectado');

const db = admin.firestore();
const products= db.collection('products');
const messages= db.collection('messages');

await products.doc().set({
    title: 'Tijera',
    price: 80,
    thumbnail: 'https://www.google.com.ar',
    description: 'Tijera de 10 cm',
    stock: 10,
    code: '123456',
    timestamp: Date.now(),
    category: 'tijera'

});

await messages.doc().set({
    email: 'rodriberdomas@gmail.com',
    message: 'Hola, quiero comprar un producto',
    timestamp: Date.now(),
    name: 'Rodrigo',
    phone: '1122334455'
});

console.log('Productos y mensajes cargados');
module.exports = db;
