let Product = require("../schemas/productSchema");
let { uid } = require("uid")

let createProduct = async (req, res) => {
    let { pname, description, price, stock, pimage, offer } = req.body;
    let product;

    try{
        product = await new Product({
            pid: uid(),
            pname,
            description,
            price,
            stock,
            pimage,
            offer
        });
        await product.save((err, data)=>{
            if(!err){
                return res.status(201).json(data)
            }else{
                return res.status(500).json({msg: "Unable to save product please try again."})
            }
        });
        
    }catch(err){
        return res.status(500).json({msg: "An Unknown error has occured"})
    }
}

let getProducts = async (req, res) => {
    let products;
    try{
        products = await Product.find({});
        if(!products){
            return res.status(404).json({msg:"No Products In this Cart, Please select some items!!"})
        }else{
           return res.status(200).json(products)
        }
    }catch(err){
        return res.status(500).json({msg: "An Unknown error has occured"})
    }
}

let getProductById = async (req, res) =>{
    let pid = req.params.pid;

    let product;
    try{
        product = await Product.findOne({pid});
        return res.json(product).status(200)
    }catch(err){
        return res.status(500).json({msg: "An Unknown error has occured"})
    
    }
}

let editProduct = async (req, res) => {

    let pid = req.params.pid;
    let { pname, description, price, pimage, offer } = req.body;

    let product;

    try{
        product = await Product.findOne({pid});
        if(product){
            product.pname = pname;
            product.description = description;
            product.price = price;
            product.pimage = pimage;
            product.offer = offer;

            product.save()
            return res.status(200).json(product)
        }else{
            return res.status(500).json({msg: "Unable to Update the product please try again."})
        }
    }catch(err){
        return res.status(500).json({msg: "An Unknown error has occured"})
    }
    
}

module.exports = { createProduct, getProducts, getProductById, editProduct }