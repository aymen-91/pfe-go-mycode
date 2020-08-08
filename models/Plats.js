const mongoose = require("mongoose")
const PlatsSchema = mongoose.Schema({

   
    name:{
        type:String,
        required:true
    },

    price:{
        type:String,
        required:true
    },
    nature:{
        type:String,
        required:true
    },
    origine:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
    }


 
})
module.exports=Contact=mongoose.model("PLats",PlatsSchema)