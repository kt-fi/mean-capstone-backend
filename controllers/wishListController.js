let mongoose = require("mongoose");
let WishList = require("../schemas/wishlistSchema")

let addProductToWishList = async (req, res) => {
    let uid = req.params.uid;
    let { pid, pname, pimage } = req.body;

    let wishList;
    try{
        wishList = await WishList.findOne({uid});
        if(wishList){
            wishList.products.push({pid, pname, pimage})
            await wishList.save()
            return res.json(wishList)
        }else{
            const newWishList = await new WishList({
                uid,
                products: [{ pid, pname, pimage }]
              });
              await newWishList.save();
              return res.json(newWishList)
        }
    }catch(err){
        res.send(err)
    }
}

let getWishList = async (req, res) =>{
    let uid = req.params.uid;

    let wishList;
    try {   
        wishList = await WishList.findOne({uid});
       
        if(!wishList){
            return res.json({msg: "No Wishlist foind for this user"})
        }

        return res.json(wishList.products.toObject({getters:true}))

    }catch(err){
        res.json({msg:"unexpected error"})
    }
}

let deleteWishListItem = async (req, res) => {
    let uid = req.params.uid;
    let itemId = req.params.itemId;


    let wishList = await WishList.findOne({uid});


    if(!wishList){
        return res.json({err:"No User List could be found"})
    }
    try{
        await wishList.products.pull({_id: itemId})
        wishList.save()
    }catch(err){
        return res.json({msg:"Unexpected Error"})
    }
       
   return res.json(wishList.toObject({getters:true}))
    
}


module.exports = { addProductToWishList, getWishList, deleteWishListItem }