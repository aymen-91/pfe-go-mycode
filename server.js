const express = require("express")
const mongoose = require("mongoose")
//appel des 3 routers
const routerComande = require('./routes/Comandes')
const routerPlat = require('./routes/Plats')
const routerUser = require('./routes/users')
const  routerAuth = require('./routes/Auth')
 
const config=require('config')

const app=express()

app.use(express.json())

// const db = "mongodb://localhost:27017/restApiDb"
const db = config.get('mongoURI')

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log('mongo connected')).catch(err=>console.log(err))

//users
app.use("/user-list",routerUser)

//comandes
app.use("/comande-list",routerComande)

//plats
app.use("/plat-list",routerPlat)

//auth

app.use("/Auth", routerAuth)

//connexion server
const port = process.env.PORT || 5000 

app.listen(port,err =>{
err?console.log('failed connexion'):console.log('server in running on 5000')
} 
)