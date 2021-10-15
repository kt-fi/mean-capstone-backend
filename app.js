let express = require("express");
let mongoose = require("mongoose");

let app = express();

//CONNECT TO MONGODB
mongoose.connect("mongodb://localhost:27017/myCapstoneDB", { useUnifiedTopology: true, useNewUrlParser: true }, (err)=>{
    if(!err){
        console.log("connected to DB")
    }else{
        console.log("Error in db connection")
    }
})




//LISTEN ON PORT 3001
app.listen(3001, console.log("Server Listening on Port 3001"))