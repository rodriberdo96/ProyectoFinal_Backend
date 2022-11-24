const fs = require('fs');
const { ConsoleMessage } = require('puppeteer');

class Cart {
    constructor() {
        this.route = './cart.json';
    }
    async addToCart(req,res) {
        try {
            const cartRoute = JSON.parse(await fs.readFile(this.route ,'utf-8'))
            const elementosFiltrados = cartRoute.filter(e => e.id === (parseInt(idCarrito))) 
            const content = JSON.parse(await fs.readFile('./products.json','utf-8'))
            const ProductoFiltrados = content.find(e => e.id === (parseInt(id))) 
            const cartProducts = elementosFiltrados.find(element => element.productos);
            if(elementosFiltrados.length === 0){
                return({ error : 'Carrito no encontrado' })
            } else {
                if(ProductoFiltrados === undefined ) {
                    return({ error : 'Producto no encontrado' })
                } else {
                    cartProducts.productos.push(ProductoFiltrados)
                    await fs.writeFile(this.route,JSON.stringify(cartRoute, null, 2))
                    return elementosFiltrados
                }
            }
        } catch (error) {
            return(error)
        }
    }

    async newCart() {
        try {
            const cartRoute = await fs.readFileSync(this.route, 'utf-8');
            let newId;
            if (cartRoute.length === 0) {
                newId = 1;
            } else {
                newId= cartRoute[cartRoute.length - 1].id + 1;
            }
            const newCart={
                id: newId,
                timestamp: Date.now(),
                products: []
            };
            cartRoute.push(newCart);
            await fs.writeFileSync("./cart.txt", JSON.stringify(cartRoute));
            return newCart;
        } catch (error) {
            return(error);
        }
    }
    getProductsCartByID(idCarrito) {
        try {
            const cartRoute = fs.readFileSync(this.route, 'utf-8');
            const elementosFiltrados = cartRoute.filter(elemento => elemento.id === parseInt(idCarrito));
            console.log(elementosFiltrados);
            if (elementosFiltrados.length === 0) {
                res.status(404).send("No se encontro el producto");
            } else {
                const cartProducts = elementosFiltrados.find(elemento => elemento.productos);
                Console.log(cartProducts.productos);
                return (cartProducts.productos);
            }
        } catch (error) {
            return(error);
        }
    }
    deleteCartByID(id) {
        try {
            const cartRoute = fs.readFileSync(this.route, 'utf-8');
            const elementosFiltrados = cartRoute.filter(elemento => elemento.id !== parseInt(id));
            if (elementosFiltrados.length === 0) {
                res.status(404).send("No se encontro el producto");
            } else {
                fs.writeFileSync(this.route, JSON.stringify(elementosFiltrados));
                res.status(200).send("El producto fue eliminado con exito");
            }
        } catch (error) {
            return(error);
        }
    }
    async deleteProductCartByID(idCarrito,id) {
        try {
            const cartRoute = fs.readFileSync(this.route, 'utf-8');
            const elementosFiltrados = cartRoute.filter(elemento => elemento.id !== (parseInt(idCarrito)));
            const  content = fs.readFileSync("./products.json", 'utf-8');
            const productsFiltrados = content.filter(elemento => elemento.id !== id);
            if (elementosFiltrados.length === 0) {
                res.status(404).send("No se encontro el carrito");
            } else {
                if (productsFiltrados.length === 0) {
                res.status(404).send("No se encontro el producto");
                } else {
                    const indexProduct = cartProducts.productos.findIndex((prod) => prod.id === id);
                    if(indexProduct === -1) {
                        res.status(404).send("No se encontro el producto");
                    } else {
                        cartProducts.productos.splice(indexProduct, 1);
                        await fs.writeFileSync(this.route, JSON.stringify(cartRoute));
                        return elementosFiltrados
                    }
                }
            }
        } catch (error) {
            return(error);
        }
    }
}

const cartController = new Cart();

module.exports = cartController;