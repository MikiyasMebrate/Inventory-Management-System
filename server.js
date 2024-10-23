const express = require('express')
require('dotenv').config()
const connectDb = require('./config/dbConnection') 

connectDb() //connect database
const app = express()

//middlewares
app.use(express.json()) // for req.body

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server running on http://localhost:${server.address().port}/`)
})
