const mongoose = require('mongoose')

const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    lastNames: String, 
    address: String,
    age: Number,
    email: String,
    phone: Number,
    //foto o avatar
    username: String,
    password: String
}))

module.exports = { User }
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://Localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true })