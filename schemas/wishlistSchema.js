let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let wishlistSchema = new Schema({
    uid: { type: String },
    products: [
      {
        pid: String,
        pname: String,
        pimage: String,
    }]
})

module.exports = mongoose.model('WishList', wishlistSchema)