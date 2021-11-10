let mongoose = require("mongoose");
let WishList = require("../schemas/wishlistSchema")

let addProductToWishList = async (req, res) => {
    let uid = req.params.uid;
    let { pid, pname, pimage, quantity, price } = req.body;

    let wishList;
    try{
        wishList = await WishList.findOne({uid});
        if(wishList){

            if(wishList){
                let productIndex = wishList.products.findIndex(p => p.pid == pid)
                if(productIndex > -1){
                    let productItem = wishList.products[productIndex];
                    productItem.quantity = quantity;
                    wishList.products[productIndex] = productItem;
                    await wishList.save();
                }else{
                    wishList.products.push({pid, pname, pimage, quantity, price})
                    await wishList.save()
                }  
            }
                
            return res.status(201).json(wishList)
        }else{
            const newCart = await new WishList({
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

let getWishList = async (req, res) =>{
    let uid = req.params.uid;
    console.log(uid)
    let wishList;
    try {   
        wishList = await WishList.findOne({uid});
       
        if(!wishList){
            return res.status(404).json({msg: "No Wishlist foind for this user"})
        }
        return res.status(200).json(wishList.products.toObject({getters:true}))
    }catch(err){
        return res.status(500).json({msg: "An Unknown error has occured"})
    }
}

let deleteWishListItem = async (req, res) => {
    let uid = req.params.uid;
    let itemId = req.params.itemId;
    
    let wishList = await WishList.findOne({uid});

    if(!wishList){
        return res.json({err:"No User List could be found"}).status(404)
    }
    try{
        await wishList.products.pull({_id: itemId})
        await wishList.save()
    }catch(err){
        return res.json({msg: "An Unknown error has occured"}).status(500)
    }
       
   return res.json(wishList.toObject({getters:true})).status(204)
    
}


module.exports = { addProductToWishList, getWishList, deleteWishListItem }