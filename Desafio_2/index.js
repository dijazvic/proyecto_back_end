const ProductManager = require("./product_manager.js")
let productManager = new ProductManager()
console.log(productManager)

let persisitirProduct = async () => {
    let product = await productManager.createProduct ()
    console.log(product)
}

persisitirProduct()