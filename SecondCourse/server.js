import http from "http";
import  {getProducts, getProduct, createProduct}  from "./controllers/productControllers.js"
const PORT = process.env.PORT


const server = http.createServer((req, res) => {
    if (req.url === "/api/products" && req.method === "GET"){
        getProducts(req, res)
    }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET"){
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    }else if(req.url === "/api/products" && req.method === "POST"){
        createProduct(req, res)
    }else{
        res.writeHead(404, {"Content-Typ": "application/json"})
        res.end(JSON.stringify({message: "Route Not Found"}))
    }
})

server.listen(PORT, ()=>{
    console.log(`Listening at port ${PORT}`)
})