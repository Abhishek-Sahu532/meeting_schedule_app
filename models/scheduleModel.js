const Mongoose = require('mongoose')


const scheduleSchema = new Mongoose.Schema({
    user:{
        type: Mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    day:{
        type: Date,
        required: true
    },
    dayStart: {
        type: Date,
        required: true
    },
    dayEnd: {
        type: Date,
        required: true
    },
    evetDuration:{
        type: Date,
        required: true
    },
    events:[
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
})


module.exports = Mongoose.model('Schedule', scheduleSchema)