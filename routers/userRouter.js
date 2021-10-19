const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router()


router.post("/createUser", userController.createUser);
router.get("/getUser", userController.getUser);
router.put("/:uid/addAddress", userController.addAddress);
router.delete("/:uid/deleteUser", userController.deleteUser);


module.exports = router;