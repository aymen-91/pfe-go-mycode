const mongoose = require("mongoose")
const UsersSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        uniq:true
    },
    pasword:{
        type:String,
        required:true
    },

    tel:{
        type:String
    },
    isAdmin: 
    { type: Boolean,
         required: true, 
         default: false },
})
module.exports=Contact=mongoose.model("users",UsersSchema)