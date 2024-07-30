require("dotenv").config()

const config = require("./config.json")

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const {authenticate} = require('./utilities')

const app = express()

mongoose.connect(config.connectionString)
.then(()=>{
    console.log('Connected to db')
})
.catch((err)=>{
    console.log(err)
})

app.use(
    cors({
        origin:"*"
    })
)

app.listen(8000)

module.exports = app