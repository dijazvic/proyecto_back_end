import ProductManager from "../product_manager.js"

const productManager = new ProductManager('./desafio03/data/products.json',  './desafio03/data/count.txt')

export const getProductsService = async (limit)=>{
    try {
        const products = await productManager.getProducts()

        if(products.length <= 0) throw {name: 'db error', httpcode: 500, description: 'No se encontraron productos'}

        if(limit){
            const limited = products.slice(0, limit)

            return limited
        }

        return products
    } catch (error) {
        throw error
    }
}

export const getProductByIdService = async (id)=>{
    try {
        const product = await productManager.getProductsById(id)

        if(!product) throw {name: 'client error', httpcode: 404, description: 'Producto no encontrado'}

        return product
    } catch (error) {
        throw error
    }
}