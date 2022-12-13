const {productsModel} = require('../models/mongProductsModel');

class ProductDao {
    constructor() {
        this.route = './products.json';
    }

    async getAll() {
        try {
            const content = await productsModel.find();
            return content;
        } catch (error) {
            return [];
        }
    }

    async saveProduct(product) {
        try {
            const content = await productsModel.find();
            if (content.length > 0) {
                product.id = content[content.length - 1].id + 1;
                const newProduct = new productsModel(product);
                await newProduct.save();
            } else {
                const newProduct = new productsModel(product);
                await newProduct.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(idProduct) {
        try {
            const content = await productsModel.findbyId(idProduct);
            return content;
        } catch (error) {
            return error;
        }
    }
    async updateProduct (idProduct, data) {
        try {
            const content = await productsModel.findByIdAndUpdate(idProduct, data);
            return content;
        } catch (error) {
            return error;
        }
    }
    async deleteProduct (idProduct) {
        try {
            const content = await productsModel.findByIdAndDelete(idProduct);
            return content;
        } catch (error) {
            return error;
        }
    }
    
    async getProductsByCategory(category) {
        try {
            const content = await productsModel.find({category});
            return content;
        } catch (error) {
            return error;
        }
    }
}

module.exports = ProductDao