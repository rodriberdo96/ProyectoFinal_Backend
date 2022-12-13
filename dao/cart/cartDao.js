const cartModel = require('../models/mongoCartModel');

class CartDao {
    constructor() {
        this.route = './cart.json';
    }

    async getAll() {
        try {
            const content = await cartModel.find();
            return content;
        } catch (error) {
            return [];
        }
    }

    async saveCart(cart) {
        try {
            const content = await cartModel.find();
            if (content.length > 0) {
                cart.id = content[content.length - 1].id + 1;
                const newCart = new cartModel(cart);
                await newCart.save();
            } else {
                const newCart = new cartModel(cart);
                await newCart.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(idCart) {
        try {
            const content = await cartModel.findById(idCart);
            return content;
        } catch (error) {
            return error;
        }
    }
    async updateCart (idCart, data) {
        try {
            const content = await cartModel.findByIdAndUpdate(idCart, data);
            return content;
        } catch (error) {
            return error;
        }
    }
    async deleteCart (idCart) {
        try {
            const content = await cartModel.findByIdAndDelete(idCart);
            return content;
        } catch (error) {
            return error;
        }
    }
}

module.exports = new CartDao();