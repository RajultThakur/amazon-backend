const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
   email:String,
   name:String,
   pincode:Number,
   flat:String,
   area:String,
   state:String,
   town:String

});

module.exports = mongoose.model("address",addressSchema)