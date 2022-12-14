//importaciones
const {Router} = require('express');
const productController = require ('../../controllers/products/index.js');
const productControllerFB = require ('../../firebase/fireBase.js');
const admin = require ('../../admin.js');
//instancias
const routerProducts =  new Router();

//rutas

routerProducts.get('/', (req, res) => {
    const products = productController.getAll();
    res.send(products);
});

routerProducts.get('/:id',async (req,res,next) => {
    const { id } = req.params
    const productsFB = await productControllerFB.getById(id)
    res.send(productsFB)
})
routerProducts.post('/',admin, (req,res) => productController.save);

routerProducts.put('/:id', (req, res) => {
    const {id} = req.params;
    const {timestamp, name, description, code, picture, price, stock, category} = req.body;
    const updateProduct = productController.update(id, timestamp, name, description, code, picture, price, stock, category);
    res.send(updateProduct);
});

routerProducts.delete('/:id',admin, (req, res) => {
    const {id} = req.params;
    const deleteProduct = productController.deleteById(id);
    res.send(deleteProduct);
});


//exportacion
module.exports = routerProducts;