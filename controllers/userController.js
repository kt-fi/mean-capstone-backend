const mongoose = require("mongoose");
const { uid } = require("uid");
const bcrypt = require("bcrypt");
const User = require("../schemas/userSchema");


let createUser = async (req, res) => {
    
    let { uname, email, utype, password } = req.body;

    const saltRounds = 12;
 
    let newUser;
        try{
        newUser = await new User({
            uid: uid(),
            uname,
            email,
            utype,
            password: await bcrypt.hash(password, saltRounds)
        })

        await newUser.save((err, data)=>{
            if(!err){
                res.status(201).json(data)
            }else{
                res.status(500).send("An error has occured whilst saving user, please try again!")
            }
        }); 
        }catch(err){
            res.status(500).send("Unexpected Error")
        }
    }

module.exports = { createUser }