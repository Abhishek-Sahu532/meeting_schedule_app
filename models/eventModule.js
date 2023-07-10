const Mongoose = require('mongoose')

const eventSchema = new Mongoose.Schema({
    menteeEmail:{
        type: String,
        required: true
    },
    mentorId:{
        type: Mongoose.Schema.Types.ObjectId, // this will refrence to the user
    ref:'User'
    },
    schedule:{
        type: Mongoose.Schema.Types.ObjectId, //FOREIGN KEYS
        ref:'Schedule'
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    day:{
        type: Date,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
})


module.exports = Mongoose.model('Event', eventSchema)