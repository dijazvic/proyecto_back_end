const ProductManager = require("./product_manager.js")
let productManager = new ProductManager()
console.log(productManager)

let persisitirProduct = async () => {
    let product = await productManager.createProduct ("Puerta de chapa", "Es una puerta de doble chapa", "$30000", "./productos/puertas_chapa", "3596", "1")
    console.log(product)
}

persisitirProduct()