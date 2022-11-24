//importaciones
const express = require('express');
const routerCart = require ('./routes/cart/index');
const routerProducts = require ('./routes/products/index');

//instancias
const app = express();

//configuraciones
const port = 8080;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use ('/api/cart',  routerCart);
app.use ('/api/products',  routerProducts);

//rutas


app.get('/api', (req, res) => {
    res.send('Bienvenido a mi servidor');
});



//Servidor
const server = app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
    });

server.on ('error', error => console.log(`Server is not running due to: ${error}`));