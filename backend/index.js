require("dotenv").config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const {authenticateToken} = require('./utilities')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())

app.use(
    cors({
        origin:"*"
    })
)

mongoose.connect(process.env.mongodbURL)
.then(()=>{
    console.log('Connected to db')
})
.catch((err)=>{
    console.log(err)
})

const User = require('./models/user.model')
const Note = require('./models/note.model') 


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

// Login

app.post('/login',async (req,res)=>{
    const {email,password} = req.body
    
    if(!email) {
        return res.status(400).json({error:true,message:"Email is required"})
    }

    if(!password) {
        return res.status(400).json({error:true,message:"Password is required"})
    }

    const userInfo = await User.findOne({email:email})

    if(!userInfo){
        return res.status(400).json({message:'User not found'})
    }

    if(userInfo.email == email && userInfo.password == password){
        const user = {user:userInfo}
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN,{
            expiresIn:"3600m"
        })
        return res.json({
            error:false,
            message:"Login successful",
            email,
            accessToken
        })
    }

    else{
        return res.status(400).json({error:true,message:'Invalid Credentials'})
    }
})

//Get user

app.get('/get-user',authenticateToken,async(req,res)=>{
    const {user} = req.user

    const isUser = await User.findOne({_id:user._id})

    if(!isUser){
        return res.sendStatus(401)
    }

    return res.json({
        user:{
            fullName:isUser.fullName,
            email:isUser.email,
            "_id":isUser._id,
            createdOn:isUser.createdOn
        }
        
    })
})

// Add note

app.post('/add-note',authenticateToken, async (req,res)=>{
    const {title,content,tags} = req.body
    const {user} = req.user

    if(!title) {
        return res.status(400).json({error:true,message:"Title is required"})
    }
    if(!content) {
        return res.status(400).json({error:true,message:"Content is required"})
    }

    try{
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id
        })

        await note.save()

        res.json({error:false,message:"Note added successfully",note})
    }
    catch(err){
        return res.status(500).json({error:true,message:"Internal Server error"})
    }

})

// Edit note

app.put('/edit-note/:id',authenticateToken, async (req,res)=>{
    const noteId = req.params.id
    const {title,content,tags,isPinned} = req.body
    const {user} = req.user

    if (!title && !content && !tags){
        return res.status(400).json({error:true,message:'No changes provided'})
    }

    try{
        const note = await Note.findOne({_id:noteId,userId:user._id})

        if (!note) {
            return res.status(404).json({error:true,message:'Note not found'})
        }
    
        if (title) note.title = title
        if (content) note.content = content
        if (tags) note.tags = tags
        if (isPinned) note.isPinned = isPinned

        await note.save()

        return res.json({
            error:false,
            note,
            message:'Note edited successfully'
        })
    }
    catch(err){
        res.status(500).json({
            error:true,
            message:"Internal Server error"
        })
    }
})

// Get all notes
app.get('/get-all-notes',authenticateToken,async (req,res)=>{
    const {user} = req.user

    try{
        const notes = await Note.find({userId:user._id}).sort({isPinned:-1})
        return res.json({
            error:false,
            notes,
            message:'Successfully retrieved all notes'
        })
    }
    catch(err){
        res.status(500).json({
            error:true,
            message:"Internal Server error"
        })
    }
})

// Delete notes

app.delete('/delete-note/:id',authenticateToken,async(req,res)=>{
    const noteId = req.params.id
    const {user} = req.user

    try{
        const note = await Note.findOne({_id:noteId,userId:user._id})

        if(!note){
            return res.status(404).json({error:true,message:'Note not found'})
        }

        await Note.deleteOne({_id:noteId,userId:user._id})

        return res.json({error:false,message:"Note deleted successfully"})
    }

    catch(err){
        res.status(500).json({
            error:true,
            message:"Internal Server error"
        })
    }
    
})

// Update isPinned
app.put('/note-pinned/:id',authenticateToken,async(req,res)=>{
    const noteId = req.params.id
    const {user} = req.user
    const {isPinned} = req.body

    try{
        const note = await Note.findOne({_id:noteId,userId:user._id})

        if(!note){
            return res.status(404).json({error:true,message:'Note not found'})
        }

        note.isPinned = isPinned
        await note.save()
        return res.json({
            error:false,
            note,
            message:'Note edited successfully'
        })
    }
    catch(err){
        res.status(500).json({
            error:true,
            message:"Internal Server error"
        })
    }
})

// Search api
app.get('/search-notes',authenticateToken,async(req,res)=>{
    const {user} = req.user;
    const {query} = req.query

    if(!query){
        return res.status(400).json({error:true, message:"Please enter a search term"})
    }

    try{
        const notes = await Note.find({
            userId:user._id,
            $or:[
                {title:{$regex: new RegExp(query,'i')}},
                {content:{$regex: new RegExp(query,'i')}},
            ]
        })

        return res.json({
            error:false,
            notes,
            message:"Search result retrieved successfully"
        })
    }
    catch(err){
        res.status(500).json({error:true,message:"Internal server error"})
        console.log(err)
    }


})

app.listen(port)

module.exports = app
