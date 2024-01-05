const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:String,
    password:String,
    email:String,
    date : {
        type:Date,
        default:Date.now,
    }
})

module.exports = mongoose.model("user",userSchema);