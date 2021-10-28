let mongoose = require("mongoose");

let User = require("../schemas/userSchema");
let Cart = require("../schemas/cartSchema");

let addProductToCart = async(req, res) => {
    let uid = req.params.uid;
    let { pid, pname, pimage, quantity, price } = req.body;

    let cart;
    try{
        cart = await Cart.findOne({uid});
        if(cart){
            cart.products.push({pid, pname, pimage, quantity, price})
            await cart.save()
            return res.json(cart)
        }else{
            const newCart = await new Cart({
                uid,
                products: [{ pid, pname, pimage, quantity, price }]
              });
              await newCart.save();
              return res.json(newCart)
        }
    }catch(err){
        res.send("error")
    }
}

let getUserCartList = async (req, res) => {
    let uid = req.params.uid;

    let cart;

    try{
        cart = await Cart.findOne({uid});

        if(!cart){
            return res.json({msg: "No User Cart Found"})
        }

        return res.json(cart.products.toObject({getters:true}))
           
    }catch(err){
        return res.json({msg: "An Unexpected Error occured"})
    }
}


let deleteCartItem = async (req, res) =>{
    let uid = req.params.uid;
    let cartProduct = req.params.cartProductId;


    let cart = await Cart.findOne({uid});


    if(!cart){
        return res.json({err:"No User Cart could be found"})
    }
    try{
        await cart.products.pull({_id: cartProduct})
        cart.save()
    }catch(err){
        return res.json({msg:"Unexpected Error"})
    }
       
   return res.json(cart.toObject({getters:true}))
    
    
}


module.exports = { addProductToCart, deleteCartItem, getUserCartList }