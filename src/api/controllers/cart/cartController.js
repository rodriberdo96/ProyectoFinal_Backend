const containerCart = require('../../services/cartServices')
const newContainerCart = containerCart.getInstance()

const containerProducts = require('../../services/productsServices')
const newContainerProducts = containerProducts.getInstance()

let instance = null

class cartControllers {

    static getInstance() {
        if(!instance) {
            instance = new cartControllers()
        }
        return instance
    }

    async addCart(req, res) {
        try {
            const newCart = await newContainerCart.createCart() 
            res.status(200).json(newCart)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async deleteCart(req, res) {
        try {
            const deleteCart = await newContainerCart.deleteCart(req.params.id)
            res.status(200).json(deleteCart)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async productsinCart(req, res) {
        try {
            const productsInCartById = await newContainerCart.listProductsInCart(req.params.id)
            res.status(200).json(productsInCartById)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async addProductInCart(req, res) {
        try {
            const product = await newContainerProducts.getByIdProduct(req.body.idProduct)
            const addProduct = await newContainerCart.addProductInCart(req.params.id, product)
            res.status(201).json(addProduct)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async deleteProductInCart(req, res) {
        try {
            const deleteProduct = await newContainerCart.deleteProductInCart(req.params.idcart, req.params.idprod)
            res.status(200).json(deleteProduct)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

}

module.exports = cartControllers

