import {findAll, findById, create} from "../models/productModels.js";

export async function getProducts(req, res) {
    try {
        const products = await findAll()
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(products));
        res.end()
    } catch (error) {
        console.log(error)
    }
}
export async function getProduct(req, res, id) {
    try {
        const product = await findById(id)
        
        
        if(!product){
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({ message: "Product Not Found"}));
        }else {
            res.setHeader("Content-Type", "application/json")
            res.write(JSON.stringify(product));
            res.end();
        }
    } catch (error) {
        console.log(error)
    }
}


export async function createProduct(req, res) {
    try {
        const product = {
            title: "Test Product",
            description: "This product",
            price: 100
        }
        
        
        const newProduct = await create(product)
        
       
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({ message: "Product Not Found"}));
        
    } catch (error) {
        console.log(error)
    }
}

