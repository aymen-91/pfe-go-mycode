
const express =  require('express')
const routerComande = express.Router()
const  comande = require('../models/comandes')  
const{auth ,isAdmin} = require('../middleware/auth')
 

routerComande.post('/',async(req,res)=>{
    try {
        const {UserName,TotalPrice,NameOfPlats, NumerberOfPrice,isVlidated}=req.body
    

        const newComande = new comande({
            UserName,
            TotalPrice,
            NameOfPlats, 
            NumerberOfPrice,
            isVlidated
        })
        const comandes = await newComande.save()
        res.json(comandes)
        
    } catch (err) {
        console.error(err.message)
        
    }
})
routerComande.get('/',async(req,res) => {
    try {
        const comandes=await comande.find()
        comandes.length===0?res.status(400).json({msg:"object is empty"}):res.json(comandes)
    } catch (err) {
        console.error(err.message)
    }

})



routerComande.put('/:id' ,async(req,res)=>{
    try {
         
        await comande.findByIdAndUpdate({_id:req.params.id},{isVlidated:true})
        res.send({success:true})
    } catch (err) {
        console.error(err.message)
        res.send({success:false}) 
    }
})

routerComande.delete('/:id',auth,isAdmin,async(req,res) =>{
    try {
        let id_comande = req.params.id 
        await comande.findOneAndDelete({_id:id_comande})
        res.send({success:true})
    } catch (err) {
        console.error(err.message)
        res.send({success:false })
    } 
    })

module.exports=routerComande