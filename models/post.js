const mongoose  = require('mongoose')

const postShema = mongoose.Schema({
    title:String,
    caption:String,
    image:String,
    name:String,
    email:String,
    Date:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model("post",postShema);