const mongoose = require("mongoose");
const { validationResult } = require('express-validator');
const { uid } = require("uid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let { secretKey } = require("../config/config")
const User = require("../schemas/userSchema");


//CREATE NEW USER (ADMIN OR USER)
let createUser = async (req, res) => {
    let errors = validationResult(req);

    if(!errors.isEmpty()){
       return res.status(422).json({msg:"errors exist in your sign up form please check all required inpts"})
    }

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
                    let payLoad = {uid: uid, email:email, utype: utype};
                    let token = jwt.sign(payLoad, secretKey)
                    res.status(201).json({data, token})
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
                res.send("This user cannot be found, please check credentials and try again!");
            }
        }catch(err){
            res.send("Unknown Fail");
        }
    }

    //EDIT USER DETAILS

    let updateUser = async (req, res) => {
        let errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.json(errors)
        }
    
        let uid = req.params.uid;
        let { uname, email, address } = req.body;

        let updateUser;

        try{
          updateUser = await User.findOne({uid})

          updateUser.uname = uname;
          updateUser.email = email;
          updateUser.address = address;

          updateUser.save();
          return res.json(updateUser)


        }catch(err){
            console.log(err)
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
                user.save()
                res.status(200).json(user)
            }else{
                 res.status(500).send("Adding Address to user has been unsuccesful, please try again!!")
            }
        }catch(err){
            res.status(502).send("Something went wrong! Please try again")
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
                res.send(`user with id ${uid} has been succesfuly removed from the database`) 
            }else{
                res.send(`user with id ${uid} does not appear to exist`) 
            }
        }catch(err){
            console.log("error")
        }
    }
    

module.exports = { createUser, getUser, updateUser, addAddress, deleteUser }