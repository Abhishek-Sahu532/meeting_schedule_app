const express = require('express');
const cors = require('cors'); //cross-origin 
const app = express()
const connectDB = require('./config/db')
require('dotenv').config()



connectDB()
app.set(cors());



app.listen(process.end.PORT,()=>{
    console.log('Running is running')
})



