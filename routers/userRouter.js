const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/userController");

const router = express.Router()


router.post("/createUser",[check('uname').not().isEmpty().isLength({min:5}), 
                            check('email').isEmail(), 
                            check('password').not().isEmpty().isLength({min:6})],
                            userController.createUser);

router.post("/getUser", userController.getUser);
router.put("/:uid/updateUser",[check("uname").not().isEmpty(),
                                check("email").isEmail()],
                                userController.updateUser);

router.put("/:uid/addAddress",[check('address').not().isEmpty()],
                                userController.addAddress);
                                
router.delete("/:uid/deleteUser", userController.deleteUser);


module.exports = router;