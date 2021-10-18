let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let productSchema = new Schema({
    pid: {type: Number, required: true},
    pname: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    pimage: {type: String, required: true},
    offer: {type: Boolean, required: true},
})


module.exports = mongoose.model("Product", productSchema)
