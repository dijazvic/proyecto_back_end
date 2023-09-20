import __dirname from './utils/dirname';
import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

const express = require('express')
const productRouter = require('../src/routes/products')
const cartRouter = require('../src/routes/cart.js')


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'))

app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.get('*', function (req, res) {
    res.send({ status: "error", description: `ruta ${req.url} método ${req.method} no implementada` });
}
)
const server = app.listen(8080, () => console.log("Listening on port 8080"))

const connectMongoDB = async () => {
    await mongoose.connect();
    console.log("Conectado con exito a MongoDB usando Moongose.");
};
connectMongoDB();