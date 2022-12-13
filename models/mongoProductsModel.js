const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true},
    stock: {type: Number, required: false},
    description: {type: String, required: true},
    code: {type: String, required: true},
    timestamp: {type: Date, default: Date.now},
    category: {type: String, required: true},
    image: {type: String, required: false},
    id: {type: Number, required: false}
});

const productsModel = mongoose.model('Product', productSchema);


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
} else {
    console.log('lo que se agregó a la bd');
    console.log(inserciones);
    console.log('productos insertados correctamente')
}

await mongoose.disconnect();

module.exports = productsModel;