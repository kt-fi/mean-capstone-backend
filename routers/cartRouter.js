let express = require("express");
let cartController = require("../controllers/cartController");

let router = express.Router();

router.get("/getUserCartList/:uid", cartController.getUserCartList);
router.put("/addProductToCart/:uid", cartController.addProductToCart);
router.delete("/deleteCartItem/:uid/:cartProductId", cartController.deleteCartItem)

module.exports = router;