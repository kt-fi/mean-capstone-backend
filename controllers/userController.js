const mongoose = require("mongoose");
const { validationResult } = require('express-validator');
const { uid } = require("uid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let { secretKey } = require("../config/config")
const User = require("../schemas/userSchema");
const Cart = require("../schemas/cartSchema");
const WishList = require("../schemas/wishlistSchema");

//CREATE NEW USER (ADMIN OR USER)
let createUser = async (req, res) => {
    let errors = validationResult(req);

    if(!errors.isEmpty()){
       return res.json({msg:"errors exist in your sign up form please check all required inpts"}).status(422)
    }

    let { uname, email, utype, password } = req.body;

    let userExists;
    let newUser;

    const saltRounds = 12;

        try{
            userExists = await User.findOne({email: email})
        }catch(err){
            return res.status(500).json({msg:"An unexpected error occured!!"})
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
                    let payLoad = {uid: uid, email:email, utype: utype};
                    let token = jwt.sign(payLoad, secretKey)
                    return res.json({data, token})
                }else{
                    return res.json({msg:"An error has occured whilst saving user, please try again!"}).status(500)
                }
            }); 
            }catch(err){
                return res.json({msg:"Unexpected Error"}).status(500)
            }
        }else{
            return res.json({msg:"A user with this email already exists"}).status(500)
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
                    let payLoad = {uid: user.uid, email: user.email, utype: user.utype};
                    let token = await jwt.sign(payLoad, secretKey)
                    return res.json({user, token}).status(200);
                }else{
                    return res.json({msg:"password entered is incorrect"}).status(403);
                }
            }else{
                return res.json({msg:"This user cannot be found, please check credentials and try again!"}).status(403);
            }
        }catch(err){
            return res.send("Unknown Fail").status(500);
        }
    }

    let getUserAddress = async (req, res) => {
        let uid = req.params.uid;

        try{
            user = await User.findOne({uid})
            return res.json(user).status(200)
        }catch(err){
            return res.send("Unknown Error").status(500);
        }
    }

    //EDIT USER DETAILS

    let updateUser = async (req, res) => {
        let errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(501).json("You have errors in the form, please check and try again!")
        }
    
        let uid = req.params.uid;
        let { uname, email, address } = req.body;

        let updateUser;

        try{
          updateUser = await User.findOne({uid})

          updateUser.uname = uname;
          updateUser.email = email;
          updateUser.address = address;

          await updateUser.save();
          return res.ststus(200).json(updateUser)


        }catch(err){
            return res.status(500).json({msg: "An Unknown error has occured"})
        }
    }

    //EDIT A USER ACCOUNT (ADD ADDRESS)
    let addAddress = async (req, res) => {
        let errors = validationResult(req);

        if(!errors.isEmpty()){
           return res.status(422).json({msg:"errors exist in your sign up form please check all required inpts"})
        }

        const uid = req.params.uid;
        let { address } = req.body;
        let user;
        try{
            user = await User.findOne({uid:uid})
            if(user){
                user.address = address;
                await user.save()
                return res.status(200).json(user.address)
            }else{
                 return res.status(500).json({msg:"Adding Address to user has been unsuccesful, please try again!!"})
            }
        }catch(err){
            return res.status(502).json({msg:"Something went wrong! Please try again"})
        }
    }

    //DELETE A USER ACCOUNT
    let deleteUser = async (req, res) => {
        const uid = req.params.uid;
        let uidExists;
        try{
            uidExists = await User.findOne({uid})
            if(uidExists){
                await User.deleteOne({uid:uid});
                return res.status(204).json({msg: `user with id ${uid} has been succesfuly removed from the database`}) 
            }else{
               return  res.status(404).json({msg:`user with id ${uid} does not appear to exist`}) 
            }
        }catch(err){
            return res.status(500).json({msg: "An Unknown error has occured"})
        }
    }

  
    

module.exports = { createUser, getUser, getUserAddress, updateUser, addAddress, deleteUser }