const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    timestamp: {type: Date, default: Date.now},
    products: {type: Array, required: true},
    id: {type: Number, required: false}
});

const cartModel = mongoose.model('Cart', cartSchema);

console.log('Base de datos mongo conectada')

const inserciones = [];

for (const prod of productos) {
    inserciones.push(productosDAO.create(prod))
}

const results = await Promise.allSettled(inserciones)
const rejected = results.filter(result => result.status === 'rejected')
if( rejected.length > 0){
    console.log('Error al insertar producto')
    console.log(rejected)
}

await mongoose.disconnect();

module.exports = cartModel;