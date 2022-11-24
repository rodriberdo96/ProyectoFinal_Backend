//importaciones
const {Router} = require('express');
const cartController = require ('../../controllers/cart/index.js');
//instancias
const routerCart =  new Router();

//rutas

routerCart.get('/:idCarrito/products', (req, res) => {
    const {idCarrito} = req.params;
    const products = cartController.getProductsCartByID(idCarrito);
    res.send(products);
});

routerCart.post('/', cartController.addToCart);
routerCart.post('/:idCarrito/products/:id', (req, res) => {
    const {idCarrito,id} = req.params;
    const addProduct = cartController.addToCart(idCarrito,id);
    res.send(addProduct);
});

routerCart.delete('/:id', (req, res) => {
    const {id} = req.params;
    const deleteProduct = cartController.deleteCartByID(id);
    res.send(deleteProduct);
});

routerCart.delete('/:idCarrito/products/:id', (req, res) => {
    const {idCarrito,id} = req.params;
    const deleteProduct = cartController.deleteProductCartByID(idCarrito,id);
    res.send(deleteProduct);
});



//exportacion
module.exports = routerCart;