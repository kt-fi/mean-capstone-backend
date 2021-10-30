const express = require("express");

const wishListController = require("../controllers/wishListController");


const router = express.Router()

router.get("/getWishlist/:uid", wishListController.getWishList)
router.post("/addProductToWishlist/:uid", wishListController.addProductToWishList);
router.delete("/deleteWishListItem/:uid/:itemId", wishListController.deleteWishListItem)

module.exports = router;