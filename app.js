let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors")

let userRoutes = require("./routers/userRouter");
let productRoutes = require("./routers/productRouter");
let cartRouter = require("./routers/cartRouter");
let wishListRouter = require("./routers/wishListRouter");

let app = express();

app.use(express.json())
app.use(cors())

//CONNECT TO MONGODB
mongoose.connect("mongodb+srv://admin:admin@cluster0.nsudx.mongodb.net/groceryStore?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true }, (err)=>{
    if(!err){
        console.log("connected to DB");
    }else{
        console.log("Error in db connection");
    }
})

//ROUTES

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRouter);
app.use("/wishList", wishListRouter);


//LISTEN ON PORT 3001
app.listen(3001, console.log("Server Listening on Port 3001"));

module.exports = app;