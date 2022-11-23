const fs= require('fs');

class Products {
    constructor() {
        this.db = './db/products.txt';
    }

    async save(data) {
        try {
            if (fs.existsSync(this.db)) {
                const data = await JSON.parse(fs.readFileSync(this.db, 'utf-8'));
                const lastProductId= data[data.length - 1].id;
                const newProduct=req.body
                req.body= {
                    timestamp: Date.now(),
                    name: req.body.name,
                    description: req.body.description,
                    picture: req.body.picture,
                    price: req.body.price,
                    stock: req.body.stock,
                    category: req.body.category,
                }
                newProduct.id = lastProductId ;
                data.push(newProduct);
                const writeFile= await fs.writeFileSync(this.db, JSON.stringify(data));
                res.status(201).send("El producto fue guardado con exito");
            } else {
                const data= [];
                const newProduct=req.body
                newProduct.id = 1;  
                data.push(newProduct);
                const writeFile = await fs.writeFileSync (this.db, JSON.stringify(data));
            }
        } catch (error) {
            console.log(error);
        }
    }

    getProducts() {
    return this.products;
    }
}

const productController = new Products();
module.exports = productController;