let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let wishlistSchema = new Schema({
    uid: { type: String },
    products: [{ pid: {type: String} }]
})

module.exports = mongoose.model('WishList', wishlistSchema)