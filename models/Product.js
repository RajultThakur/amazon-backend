const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    email:String,
    title:String,
    price:Number,
    url:String,
    count:{
        type:Number,
        default:1
    }

});

module.exports = mongoose.model("product",productSchema)