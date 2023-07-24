import fs from 'fs'
import Product from './product.js'

export default class ProductManager {
    
    #path
    #countPath
    #products

    constructor(path, countPath){
        this.#path = path
        this.#countPath = countPath
        this.#products = []
    }

    async #geneteId(){
        try {
            if(!fs.existsSync(this.#countPath)){
                await fs.promises.writeFile(this.#countPath, JSON.stringify(1))
                return 1
            }
            else{
                const data = await fs.promises.readFile(this.#countPath, 'utf-8')
                let count = JSON.parse(data)
                const sumCount = count + 1
                await fs.promises.writeFile(this.#countPath, JSON.stringify(sumCount))
                return sumCount
            }
        } catch (error) {
            return console.log(error)
        }
    }


    async addProduct(title, description, price, thumbnail, code, stock){
        try {
            if(!title || !description || !price || !thumbnail || !code || !stock) throw 'Todos los datos son requiridos'
            this.#products = await this.getProducts()
            const validateCode = this.#products.some(e=> e.code == code)
            if(validateCode) throw `Ya existe un producto con code: ${code} `
            const newProduct = new Product(title, description, price, thumbnail, code, stock)
            this.#products.push({
                id: await this.#geneteId(),
                ...newProduct
            })
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#products, null, 2))
            return newProduct
        } catch (error) {
            return console.log(error)
        }
    }

    async getProducts(){
        try {
            if(!fs.existsSync(this.#path)){
                return this.#products
            } 
            else{
                const data = await fs.promises.readFile(this.#path, 'utf-8')
                this.#products = JSON.parse(data)
                return this.#products
            }
        } catch (error) {
            return console.log(error)
        }
    }

    async getProductsById(id){
        try {
            const data = await fs.promises.readFile(this.#path, 'utf-8')
            this.#products = JSON.parse(data)
            const findProduct = this.#products.find(e=> e.id == id)
            if(!findProduct) throw 'Product not found'
            return findProduct
        } catch (error) {
            return console.log(error)
        }
    }

    async updateProduct(id, newData){
        try {
            const product = await this.getProductsById(id)
            const allProducts = await this.getProducts()
            const filter = allProducts.filter(i=> i.id != product.id)
            const newUpdate = {
                id: id,
                ...product,
                ...newData,
            }
            filter.push(newUpdate)
            await fs.promises.writeFile(this.#path, JSON.stringify(filter, null, 2))

            return newUpdate
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            const data = await fs.promises.readFile(this.#path, 'utf-8')
            this.#products = JSON.parse(data)
            const productDeleted = this.#products.filter(e=> e.id !== id)
            await fs.promises.writeFile(this.#path, JSON.stringify(productDeleted, null, 2))
            return productDeleted
        } catch (error) {
            return console.log(error)
        }
    }
}