let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let wishlistSchema = new Schema({
    uid: { type: String },
    products: [
      {
        pid: String,
        pname: String,
        pimage: String,
        quantity: Number,
        price:Number
    }]
})

module.exports = mongoose.model('WishList', wishlistSchema)