let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

let id = '62ebf9424e1e0b1fe3f552c4'
let prodTest ={
    name: "TEST AXIOS put ",
    description: "String",
    code: "abcd",
    url: "String",
    price: 100,
    stock: 100
}

let prodTestmodified ={
    name: "TEST AXIOS modificado",
    description: "String",
    code: "abcd",
    url: "String",
    price: 100,
    stock: 100
}

const url = "http://localhost:8080"

describe("Comprobando que funcionen correctamente los endpoints de productos", () => {
    before(() => {
        console.log('\n ** Comienzo TOTAL del Test****')
    })
    after(() => {
        console.log("\n ** Fin TOTAL del Test****'")
    })
    beforeEach(() => {
        console.log("\n ** Comienzo Test **")
    })
    afterEach(() => {
        console.log('** FIN TEST ***')
    })

    it('Debe devolver todos los productos', (done) => {
        chai.request(url)
        .get('/products')
        .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });

    it('Debe devolver el producto con el id seleccionado', (done) => {
        chai.request(url)
        .get(`/products/${id}`)
        .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });

    it('Debe crear un producto', (done) => {
        chai.request(url)
        .post('/products')
        .send(prodTest)
        .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });

    it('Debe modificar el producto con el id seleccionado', (done) => {
        chai.request(url)
        .put(`/products/${id}`)
        .send(prodTestmodified)
        .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });

    it('Debe eliminar el producto con el id seleccionado', (done) => {
        chai.request(url)
        .del(`/products/${id}`)
        .end( function(err,res){
            expect(res).to.have.status(200);
            chai.request(url)
        .get('/products')
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200);
        done();
        });
        });
    }); 
})
