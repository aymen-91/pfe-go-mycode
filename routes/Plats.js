const express =  require('express')
const routerPlat = express.Router()
const  plat = require('../models/plats')  
const{auth ,isAdmin} = require('../middleware/auth')

routerPlat.post('/' ,async(req,res)=>{
    try {
        const {name,price,nature,origine,image,quantity}=req.body
        const searchName=await plat.findOne({name})

        if (searchName) return res.status(400).json({msg:"makla mawjouda"})

        const newPlat = new plat({
            name,
            price,
            nature,
            origine,
            image,
            quantity,
           
        })
        const plats = await newPlat.save()
        res.json(plats)
        
    } catch (err) {
        console.error(err.message)
        
    }
})

routerPlat.get('/' ,async(req,res) => {
 
 
    try {
       const plats=await plat.find( )   
        plats.length===0?res.status(400).json({msg:"object is empty"}):res.json(plats)
    } catch (err) {
        console.error(err.message)
    }

})
// routerPlat.get('/:nature' ,async(req,res) => {
//     try {
//         let nature_plat = req.params.nature 
//         await plat.find ({nature:nature_plat})
         
//         plats.length===0?res.status(400).json({msg:"object is empty"}):res.json(plats)
//     } catch (err) {
//         console.error(err.message)
//     }

// })

routerPlat.delete('/:id',auth,isAdmin,async(req,res) =>{
try {
    let id_plat = req.params.id 
    await plat.findOneAndDelete({_id:id_plat})
    res.send({success:true})
} catch (err) {
    console.error(err.message)
    res.send({success:false })
} 
})

routerPlat.put('/:id',auth,isAdmin,async(req,res)=>{
    try {
        const platlist= req.body
        await plat.findByIdAndUpdate({_id:req.params.id},{$set:{...platlist}})
        res.send({success:true})
    } catch (err) {
        console.error(err.message)
        res.send({success:false}) 
    }
})

module.exports=routerPlat