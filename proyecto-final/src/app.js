import __dirname from './utils/dirname';
import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
//Passport imports
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
//Routers
import viewsRouter from './routes/index.js'
import { Router } from 'express';

const express = require('express')
const productRouter = require('./routes/products')
const cartRouter = require('./routes/cart.js')

const app = express()
//JSON settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//Cookies
//router.use(cookieParser());
app.use(cookieParser("CoderS3cr3tC0d3"));
//Middlewares Passport
initializePassport();
app.use(passport.initialize());

const SERVER_PORT = 9090;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Conectado con exito a MongoDB usando Moongose.");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();