const express = require("express");
const productController = require("../controllers/productController");
let auth = require("../auth/auth");
const { check } = require("express-validator");


const router = express.Router();

router.post("/createProduct",  auth.verifyUserToken, auth.IsAdmin,
                                [check("pname").not().isEmpty(),
                                check("description").not().isEmpty(),
                                check("price").not().isEmpty(),
                                check("pimage").not().isEmpty()],  productController.createProduct)
router.get("/getAllProducts",  productController.getProducts);
router.get("/getProductById/:pid", productController.getProductById)
router.put("/editProduct/:pid", auth.verifyUserToken, auth.IsAdmin, productController.editProduct);
router.delete("/deleteById/:pid", auth.verifyUserToken, auth.IsAdmin, productController.deleteProduct)

module.exports = router;