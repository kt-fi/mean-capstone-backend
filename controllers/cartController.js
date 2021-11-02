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

            if(cart){
                let productIndex = cart.products.findIndex(p => p.pid == pid)
                if(productIndex > -1){
                    let productItem = cart.products[productIndex];
                    productItem.quantity = quantity;
                    cart.products[productIndex] = productItem;
                    await cart.save();
                }else{
                    cart.products.push({pid, pname, pimage, quantity, price})
                    await cart.save()
                }
                   
                }
                
            return res.status(201).json(cart)
        }else{
            const newCart = await new Cart({
                uid,
                products: [{ pid, pname, pimage, quantity, price }]
              });
              await newCart.save();
              return res.status(201).json(newCart)
        }
    }catch(err){
        return res.status(500).json({msg: "An Unknown error has occured"})
    }
}

let getUserCartList = async (req, res) => {
    let uid = req.params.uid;

    let cart;

    try{
        cart = await Cart.findOne({uid});

        if(!cart){
            return res.status(404).json({msg: "No User Cart Found, please add some items from the shop!"})
        }

        return res.status(200).json(cart.products.toObject({getters:true}))
           
    }catch(err){
        return res.status(500).json({msg: "An Unexpected Error occured"})
    }
}


let deleteCartItem = async (req, res) =>{
    let uid = req.params.uid;
    let cartProduct = req.params.cartProductId;


    let cart = await Cart.findOne({uid});


    if(!cart){
        return res.status(404).json({err:"No User Cart could be found"})
    }
    try{
        await cart.products.pull({_id: cartProduct})
        cart.save()
    }catch(err){
        return res.status(500).json({msg: "An Unknown error has occured"})
    }
       
   return res.json(cart.toObject({getters:true}))
    
    
}


module.exports = { addProductToCart, deleteCartItem, getUserCartList }