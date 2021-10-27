let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let basketSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        productId: Number,
        quantity: Number,
        name: String,
        price: Number
    }]
})

    module.exports = mongoose.model('Basket', basketSchema)