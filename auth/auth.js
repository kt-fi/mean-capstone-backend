const jwt = require("jsonwebtoken");

const { secretKey } = require("../config/config")

let verifyUserToken = (req, res, next) => {
    let token = req.headers.authorization;
    if(!token){
        return res.json({msg:"ACCESS DENIED"});
    }else{
        try{
            let verifyUser = jwt.verify(token, secretKey);
            req.user = verifyUser;
            next();

        }catch(err){
            res.send("Invalid Token");
        }
    }
}

let IsUser = async (req, res, next) =>{
    if(req.user.utype == "user"){
        next()
    }else{
        return res.json({msg:"Unauthorized"})
    }
}

let IsAdmin = async (req, res, next) =>{
    if(req.user.utype == "admin"){
        next()
    }else{
        return res.json({msg:"You are Unauthorized to make this action"})
    }
}


module.exports = { verifyUserToken, IsUser, IsAdmin }