class ProductManager {
    products
   
    constructor () {  
        this.products = []
    }
}

gerateId = () => { 
    const id = this.products.length + 1
    console.log(id)      
}


addProduct = (title, description, price, thumbnail, code, stock) => {
    if(!title || !description || !price || !thumbnail || !code || !stock){
        console.log("Todos los campos son requeridos")
    }
        const product = {
        id: this.gerateId(),
        title,
        description,
        price,
        thumbnail,
        code, 
        stock
    }
this.products.push(product)
return product
}


getProducts= () => { 
    this.products
}

getProductById = (id) => {
    const findProduct = this.products.find(i=> i.id == id) 
        if (!findProduct) {
        console.log("Not found")
    }
}

const instance = new ProductManager()
instance.addProduct ("Ventana linea herrero", "Es una ventana economica", "$7000", "./productos/linea_herrero", "3590", "20"),
instance.addProduct ("Cortina black out", "No deja traslucir luz", "$10000", "./productos/cortina_black_out", "5678", "5"),
instance.addProduct ("Puerta placa", "Es una puerta de madera", "$15000", "./productos/puerta_placa", "1245", "3"),
instance.addProduct ("Ventana linea modena", "Es una ventana de mejor calidad", "$20000", "./productos/linea_modena", "3876", "10"),
instance.addProduct ("Cortina sun screen", "Deja traslucir el 100% de la luz", "$12000", "./productos/cortina_sun_screen", "9417", "4"),
instance.addProduct ("Puerta de chapa", "Es una puerta de doble chapa", "$30000", "./productos/puertas_chapa", "3596", "1")


console.log(instance.getProductById())
console.log(instance.getProducts())