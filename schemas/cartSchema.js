let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let cartSchema = new Schema({
    uid: { type: String },
    products: [
      {
        pid: String,
        quantity: Number,
    }]
})

module.exports = mongoose.model('Cart', cartSchema)