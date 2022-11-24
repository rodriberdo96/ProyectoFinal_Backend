const fs= require('fs');

class Products {
    constructor() {
        this.db = './products.txt';
    }

    async save(req,res) {
        try {
            if (fs.existsSync("./productos.txt")) {
                const data = await JSON.parse(fs.readFileSync("./productos.txt", 'utf-8', async (err, cont) => {
                    const lastProductId= data[data.length - 1].id;
                    const newProduct=req.body
                    req.body= {
                        timestamp: Date.now(),
                        name: req.body.name,
                        description: req.body.description,
                        code: req.body.code,
                        picture: req.body.picture,
                        price: req.body.price,
                        stock: req.body.stock,
                        category: req.body.category,
                    }
                    newProduct.id = lastProductId ;
                    array.push(newProduct);
                    const writeFile= await fs.writeFileSync("./cart.txt", JSON.stringify(array));
                    res.status(201).send("El producto fue guardado con exito");
                }));
            } else {
                const data= [];
                const newProduct=req.body
                newProduct.id = 1;  
                data.push(newProduct);
                const writeFile = fs.writeFileSync ("./productos.txt", JSON.stringify(data));
            }
        } catch (error) {
            res.send(error);
        }
    }

    async getAll() {
        try {
            const content = JSON.parse(await fs.readFile('./products.txt','utf-8'))
            return content
        } catch (error) {
            return []
        }
    }
    async getById(id){
        try {
            const content = JSON.parse(await fs.readFile('./products.txt','utf-8'))
            const elementosFiltrados = content.filter(e => e.id === (parseint(id)))
            console.log(elementosFiltrados)
            if (elementosFiltrados.length === 0){
                return ( {error:'no se encontro el producto'})
            } else {
                return (elementosFiltrados)
            }
        } catch (error) {
            return(error)
            null
        }
    }
    async deleteById (id) {
        try {
            const content = JSON.parse(await fs.readFile('./products.txt','utf-8'))
            const elementosFiltrados = content.filter(e => e.id !== id)
            if(elementosFiltrados.length === (content.length)){
                return({ error : 'producto no encontrado' })
            } else {
                await fs.writeFile('./products.txt',JSON.stringify(elementosFiltrados, null, 2))
                return(elementosFiltrados)
            }
        } catch (error) {
            return(error)
        
        }
    }
    async deleteAll(){
        try {
            await fs.writeFile('./products.txt',JSON.stringify([], null, 2))
            const content = JSON.parse(await fs.readFile(`./products.txt`,'utf-8'))
            console.log(content)
        } catch (error) {
            console.log(error)
            return "no pudo eliminarse"
        }
    }
    async update(id, title, price, timestamp, stock,category,description,code,picture){
        try {
            const content = JSON.parse(await fs.readFile(`./products.txt`,'utf-8'))
            const identification = Number(id)
            const index = content.findIndex(e => e.id === identification)
            const newProduct= {
                id: identification,
                title: title,
                price: price,
                timestamp: timestamp,
                stock: stock,
                category: category,
                description: description,
                code: code,
                picture: picture
            }
            if (index === -1){
                return {error: 'producto no encontrado'}
            } else {
                content[index] = newProduct
                await fs.writeFile(`./productss.txt`,JSON.stringify(content, null, 2))
                return content
            }
        } catch (error) {
            console.log(error)
            return "no pudo actualizarse"
        }
    }
}

const productController = new Products();
module.exports = productController;