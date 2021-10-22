const express = require("express");
const productController = require("../controllers/productController");
let auth = require("../auth/auth");
let { check } = require("express-validator");


const router = express.Router();

router.post("/createProduct",  auth.verifyUserToken, auth.IsAdmin, productController.createProduct)
router.get("/getAllProducts", auth.verifyUserToken, auth.IsAdmin, productController.getProducts);

module.exports = router;