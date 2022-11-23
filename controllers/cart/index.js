const fs = require('fs');

class Cart {
    constructor() {
        this.db = './db/cart.txt';
    }

    save(data) {
        try {
            if (fs.existsSync(this.db)) {
                const data = JSON.parse(fs.readFile(this.db, 'utf-8'));
                const lastProduct= data[data.length - 1].id;
                const newProduct=req.body
            }
        } catch (error) {
            console.log(error);
        }
    }

    getProducts() {
    return this.products;
  }
}

const cartController = new Cart();