const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    uid: {type: String, required: true},
    uname: {type: String, required: true},
    email: {type: String, required: true},
    utype: {type: String, required: true},
    password: {type: String, required: true},
    address: {type:String, required: false},
    basket: [{type: mongoose.Types.ObjectId, ref: 'Product'}],
    likedItems: [{type: mongoose.Types.ObjectId, ref: 'Product'}]
})


module.exports = mongoose.model("User", userSchema)
