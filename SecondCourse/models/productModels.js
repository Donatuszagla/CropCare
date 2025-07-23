import products from "../Data/data.json" assert {type: 'json'};
import { writeDataTofile } from "../utils.js"
import { v4 as uuidv4 } from "uuid";

export function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
};

export function findById(id){
    return new Promise((resolve, reject) => {
        resolve(products.find(product => product.id === id));
    })
}


export function create(product){
    return new Promise((resolve, reject) => {
       const newProduct = {id: uuidv4(), ...product}
       products.push(newProduct)
       writeDataTofile("c:/Users/Real/Desktop/Nodejs/SecondCourse/Data/data.json", `export const products = ${products}`)
       resolve(newProduct)
    })
}

create({
    title: "Test Product",
            description: "This product",
            price: 100
})
