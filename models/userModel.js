const { default: mongoose } = require('mongoose')
const Mongoose = require('mongoose')


const userSchema = new Mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    events:[{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
    ,
    schedules:[{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    }]
})


module.exports = Mongoose.model('User', userSchema)