const jwt = require("jsonwebtoken");

const { secretKey } = require("../config/config")

let verifyUserToken = (req, res, next) => {
    let token = req.headers.authorization;
    if(!token){
        return res.json("ACCESS DENIED");
    }else{
        try{
            let verifyUser = jwt.verify(token, secretKey);
            req.user = verifyUser;
            console.log(verifyUser)
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
        return res.send("Unauthorized")
    }
}

let IsAdmin = async (req, res, next) =>{
    if(req.user.utype == "admin"){
        next()
    }else{
        return res.send("Unauthorized")
    }
}


module.exports = { verifyUserToken, IsUser, IsAdmin }