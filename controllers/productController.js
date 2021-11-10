let Product = require("../schemas/productSchema");
let { uid } = require("uid");
let {validationResult } = require("express-validator");

let createProduct = async (req, res) => {
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.json({msg:"You must fill in all inputs to add new Product!"}).status(500)
    }

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
                return res.status(201).json({data, msg:"Product Succesfully Added to Database"})
            }else{
                return res.status(500).json({msg: "Unable to save product please try again."})
            }
        });
        
    }catch(err){
        return res.status(500).json({msg: "An Unknown error has occured"})
    }
}

let getProducts = async (req, res) => {

    let {page, limit} = req.query;

    let products;
    try{
        products = await Product.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

        const count = await Product.countDocuments();

        if(!products){
            return res.status(404).json({msg:"No Products In this Cart, Please select some items!!"})
        }else{
           return res.status(200).json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page)
        })
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

let deleteProduct = async (req, res) => {
    let pid = req.params.pid;
    let product;

    try{
        product = await Product.findOne({pid});

        if(!product){
            return res.json({msg: "No product found, unable to delete item!!"})
        }else{
           await Product.deleteOne({pid});
           return res.json({msg:"product succesfuly deleted!!"}).status(202)
        }
    }catch(err){
        return res.json({msg: "An Unknown error has occured"}).status(500)
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

module.exports = { createProduct, getProducts, deleteProduct, getProductById, editProduct }