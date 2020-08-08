const mongoose = require("mongoose")
const ComandesSchema = mongoose.Schema({
    UserName:{
        type:String,
       
    },

    TotalPrice:{
        type:Number,
        required:true
   
    },
    NameOfPlats:{
        type:String,
     
    },
    NumerberOfPrice:{
        type:String,
      
    },
    isVlidated: 
    { type: Boolean,
         required: true, 
         default: false },
    
})
module.exports=Contact=mongoose.model("Comandes",ComandesSchema)