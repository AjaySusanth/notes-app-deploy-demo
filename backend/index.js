require("dotenv").config()

const config = require("./config.json")

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const {authenticate} = require('./utilities')

const app = express()

app.use(express.json())

app.use(
    cors({
        origin:"*"
    })
)

mongoose.connect(config.connectionString)
.then(()=>{
    console.log('Connected to db')
})
.catch((err)=>{
    console.log(err)
})

const User = require('./models/user.model')


app.get('/',(req,res)=>{
    res.json({data:'hello'})
})

// Create account

app.post('/create-account',async (req,res)=>{
    const {fullName,email,password} = req.body
    
    if(!fullName) {
        return res.status(400).json({error:true,message:"Full Name is required"})
    }

    if(!email) {
        return res.status(400).json({error:true,message:"Email is required"})
    }

    if(!password) {
        return res.status(400).json({error:true,message:"Password is required"})
    }

    const isUser = await User.findOne({email:email})

    if(isUser){
        return res.json({error:true,message:"User already exist. Please login"})
    }

    const user = new User({
        fullName,
        email,
        password
    })

    await user.save() // Saves the data to a document in mongodb

    const accessToken = jwt.sign({user},process.env.ACCESS_TOKEN,{
        expiresIn:"36000m"
    })
    return res.json({error:false,user,accessToken,message:"Registered Successfully"})
})



app.listen(8000)

module.exports = app