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

module.exports = { createProduct, getProducts }