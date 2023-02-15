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

const ecommerce = db.collection('ecommerce')
await ecommerce.doc().set({products});
console.log('base firebase conectada');

class Products {
    
    async getAll() {
        try {
            const snapshot = await ecommerce.get();
            snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        })
            return snapshot //en la consola me lo trae pero en thunder medio raro el objeto.
        } catch (error) {
            return []
        }
    }
}

const productControllerFB = new Products();
module.exports = productControllerFB;
