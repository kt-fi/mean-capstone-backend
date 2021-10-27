const express = require("express");
const productController = require("../controllers/productController");
let auth = require("../auth/auth");



const router = express.Router();

router.post("/createProduct",  auth.verifyUserToken, auth.IsAdmin, productController.createProduct)
router.get("/getAllProducts",  productController.getProducts);
router.put("/editProduct/:pid", productController.editProduct)

module.exports = router;