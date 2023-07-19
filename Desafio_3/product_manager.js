import express from 'express';

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    products;
    productDirPath;
    productFilePath;
    fileSystem;

    constructor() {
        this.products = new Array();
        this.productDirPath = "./files";
        this.productFilePath = this.productDirPath + "/Products.json";
        this.fileSystem = require("fs");
    }

 

    createProduct = async (title, description, price, thumbnail, code, stock) => {
        let newProduct = new Product(title, description, price, thumbnail, code, stock);
        console.log("Crear Producto: producto a registrar:");
        console.log(newProduct);
        validarCodigo();
                 
        try {
            await this.fileSystem.promises.mkdir(this.productDirPath, { recursive: true });
                if (!this.fileSystem.existsSync(this.productFilePath)) {
                await this.fileSystem.promises.writeFile(this.productFilePath, "[]");
            }

            let productsFile = await this.fileSystem.promises.readFile(this.productFilePath, "utf-8"); // []
            console.info("Archivo JSON obtenido desde archivo: ");
            console.log(productsFile);
            this.products = JSON.parse(productsFile);

            console.log("Productos encontrados: ");
            console.log(this.products);
            this.products.push(newProduct);
            console.log("Lista actualizada de productos: ");
            console.log(this.products);

            await this.fileSystem.promises.writeFile(this.productFilePath, JSON.stringify(this.products, null, 2, '\t'));
        } 
        catch (error) {
            console.error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`);
            throw Error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`);
        }
    }

    productList = async () => {
        try {

            await this.fileSystem.promises.mkdir(this.productDirPath, { recursive: true });

            if (!this.fileSystem.existsSync(this.productFilePath)) {
                await this.fileSystem.promises.writeFile(this.productFilePath, "[]");
            }

            let productsFile = await this.fileSystem.promises.readFile(this.productFilePath, "utf-8");

            console.info("Archivo JSON obtenido desde archivo: ");
            console.log(productsFile);
            this.products = JSON.parse(productsFile);
            console.log("Productos encontrados: ");
            console.log(this.products);
            return this.products;

        } catch (error) {
            console.error(`Error consultando los usuarios por archivo, valide el archivo: ${this.productDirPath}, 
                detalle del error: ${error}`);
            throw Error(`Error consultando los usuarios por archivo, valide el archivo: ${this.productDirPath},
             detalle del error: ${error}`);
        }
    }
}

function validarCodigo (code) {
    var x;
    var codeProduct = 0;
    if(typeof Product != "undefined" && Product != null && Product.length != null && Product.length > 0){
        for(x in Product){
            codeProduct = Product[x]['codigo'];    
            if(code == codeProduct){
                console.log("No pueden haber dos productos con el mismo codigo!");
                return false;
            }
        }
        return true;      
    } 
    else {
      return true;
    }
}

const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));

app.get('/:products', (req, res) => {
    console.log(req.params);
    res.send(`Tu producto es: ${req.params.products}`)
})
app.get('/products/?limit=', (req, res) => {
    console.log(req.params);
    res.send(`Tu limite es de ${6} productos`)
})

app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})

module.exports = ProductManager