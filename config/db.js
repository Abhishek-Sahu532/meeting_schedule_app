const mongoose = require('mongoose')
require('dotenv').config()


const DB_URI = process.env.DATABASE_URL
const MONGO_OPTIONS ={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectDB = async ()=>{
    try{
        await mongoose.connect(DB_URI, MONGO_OPTIONS)
        console.log('DATABASE connected')
    }catch(e){
console.log(e, "NOT Connected")
process.exit() //like c commond to stop the server
    }
}


module.exports = connectDB