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
                res.json(data)
            }else{
                res.send(err)
            }
        });
        
    }catch(err){
        console.log(err)
    }
}

let getProducts = async (req, res) => {
    let products;
    try{
        products = await Product.find({});
        if(!products){
            res.send("No Products")
        }else{
            res.json(products)
        }
    }catch(err){
       res.send("An Error")
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
            res.json(product)
        }else{
            res.json({msg: "Unable to Update the product please try again."})
        }
    }catch(err){
        res.send("err")
    }
    
}

module.exports = { createProduct, getProducts, editProduct }