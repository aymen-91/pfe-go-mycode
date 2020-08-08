const express =  require('express')
const routerUser = express.Router()
const  user = require('../models/users')  
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {getToken} =require('../middleware/auth')
const routerPlat = require('./Plats')
const{auth ,isAdmin} = require('../middleware/auth')

routerUser.post('/',async(req,res)=>{
    try {
        const {name,email,pasword,tel,isAdmin}=req.body
        const searchEmail=await Contact.findOne({email})

        if (searchEmail) return res.status(400).json({msg:"User mawjoud"})

        const newUser = new user({
            name,
            email,
            pasword,
            tel,
            isAdmin
        })
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.pasword,salt,(err,hash) =>{
                if (err) throw err ;
                newUser.pasword=hash;
                newUser.save().then(user =>{
                    jwt.sign(
                        {id:user.id, isAdmin:user.isAdmin },
                          
                        config.get('jwtSecret'),
                         {expiresIn:300000},
                         (err,token) => {
                             if(err) throw err;
                             res.json(
                                { 
                                    token,
                                    user:{
                                        id:user.id,
                                        name:user.name,
                                        isAdmin:user.isAdmin                                 }
                                } )
                         }
                    )

                    
                })
            })
        })
       
        
    } catch (err) {
        console.error(err.message)
        
    }
})

routerUser.get('/',async(req,res) => {
    try {
        const users=await user.find()
        users.length===0?res.status(400).json({msg:"object is empty"}):res.json(users)
    } catch (err) {
        console.error(err.message)
    }

})

routerUser.post('/signin', async (req, res) => {

    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });
    if (signinUser) {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser)
      });
  
    } else {
      res.status(401).send({ msg: 'Invalid Email or Password.' });
    }
  
  });

  routerUser.delete('/:id',auth,isAdmin,async(req,res) =>{
    try {
        let id_user = req.params.id 
        await user.findOneAndDelete({_id:id_user})
        res.send({success:true})
    } catch (err) {
        console.error(err.message)
        res.send({success:false })
    } 
    })

 
module.exports=routerUser 