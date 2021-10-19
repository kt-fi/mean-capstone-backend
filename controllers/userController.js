const mongoose = require("mongoose");
const { uid } = require("uid");
const bcrypt = require("bcrypt");
const User = require("../schemas/userSchema");


//CREATE NEW USER (ADMIN OR USER)
let createUser = async (req, res) => {
    
    let { uname, email, utype, password } = req.body;

    let userExists;
    let newUser;

    const saltRounds = 12;

        try{
            userExists = await User.findOne({email: email})
        }catch(err){
            res.send("An unexpected error occured!!")
        }

        if(!userExists){
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
        }else{
            res.send("A user with this email already exists")
        }
    }

    //RETREIVE A USER ACCOUNT
    let getUser = async (req, res) => {

        let { email, password } = req.body;
        let user;
        let isPassword
        try{
            user = await User.findOne({email: email});

            if(user){

              isPassword = await bcrypt.compare(password, user.password)
                
                if(isPassword == true){
                    res.json(user);
                }else{
                    res.send("password entered is incorrect");
                }
                
            }else{
                res.send("unable to find user");
            }
        }catch(err){
            res.send("Unknown Fail");
        }
    }

    //EDIT A USER ACCOUNT
    

module.exports = { createUser, getUser }