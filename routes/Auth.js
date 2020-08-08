const express =  require('express')
const routerAuth = express.Router()
const  User = require('../models/users')  
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

routerAuth.post('/',(req,res) =>{
    const {email,pasword} = req.body

    if ( !email || !pasword) {
        return res.status(400).json({ msg: 'Please enter all fields' });
      }

User.findOne({email})
.then(user => {
    if (!user) return res.status(400).json({msg:'User mouch mawjoud'})

    bcrypt.compare(pasword, user.pasword)
    .then(isMatch => {
        if(!isMatch) return res.status(400).json({msg:'problem in pasword'})

        jwt.sign(
            {id:user.id,isAdmin:user.isAdmin},
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
                            isAdmin:user.isAdmin
                        }
                    } )
             }
        )
        
    })

})

})


module.exports=routerAuth