import __dirname from './utils/dirname';

const express = require('express')
const productRouter = require('../src/routes/products')
const cartRouter = require('../src/routes/cart.js')


const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.get('*', function (req, res) {
    res.send({ status: "error", description: `ruta ${req.url} método ${req.method} no implementada` });
}
)
const server = app.listen(8080, () => console.log("Listening on port 8080"))