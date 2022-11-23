//importaciones
const {Router} = require('express');
const productController = require ('../../controllers/products/index.js');

//instancias
const routerProducts =  new Router();

//rutas

routerProducts.get('/', (req, res) => {});
routerProducts.post('/', () => productController.save);
routerProducts.put('/', (req, res) => {});
routerProducts.delete('/', (req, res) => {});


//exportacion
module.exports = routerProducts;