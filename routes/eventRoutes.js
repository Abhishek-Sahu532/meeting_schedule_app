const express = require('express');
const router = express.Router()
const Event = require('../models/eventModule')
const isAuthenticated = require('../middlewares/auth')
const {validateEmail} = require('../utils/validators');
const scheduleModel = require('../models/scheduleModel');



router.post('/create', async (req, res)=>{
    try{
const {
    menteeEmail, 
    mentorId,
    schedule,
    title,
    description,
    day,
    start,
    end
} = req.body;

if(!validateEmail(menteeEmail)){
    return res.status(400).json({
        err: 'Invalid Email'
    })
}

const foundUser = await Event.findById(mentorId)
if(!foundUser){
    return res.status(404).json({
        err: 'Mentor not found'
    })
}

const foundSchedule = await scheduleModel.findById(schedule) //finding existing schedule

if(!foundSchedule){
    return res.status(400).json('No availability set')
}

if(start < foundSchedule.dayStart || end > foundSchedule.dayEnd){ //selected time is from availibity or not  || Event time will be in availibility time
return res.status(400).json({
    err: 'Not In between availability time'
})
}

const foundClashingMenteeEvent = await Event.findOne({ //checking if the two user is selected the meeting for the same time
    menteeEmail,
    day,
    start :{$lte:end}, //less than
    end: {$gte: start} //greater than
})

if(foundClashingMenteeEvent){
    res.status(400).json({
        err: 'Clashing Meeting'
    })
}

const foundClashingMentorEvent = await Event.findOne({
    mentorEmail,
    day,
    start :{$lte:end}, //less than
    end: {$gte: start} //greater than
})

if(foundClashingMentorEvent){
    return res.status(400).json({
        err: 'Clashing Meetings'
    })
}

const newEvent = new Event({
    menteeEmail,
    mentorId,
    schedule,
    title,
    description,
    day,
    start,
    end
})

await newEvent.save()
foundUser.events.push(newEvent) //pushing into the Event model in events array
foundSchedule.event.push(newEvent)
await foundUser.save()
await foundSchedule.save()
return res.status(201).json(newEvent)
    }catch(e){
        return res.status(500).send(e)
    }
})


router.get('/get/:eventId', async (req, res)=>{
    try {
        const foundEvent = await Event.findById(req.params.eventId);
        if(!foundEvent){
            return res.status(404).json({
                err: 'No Event Found'
            })
        }

        return res.status(200).json(foundEvent)
    } catch (error) {
        return res.status(500).send(error)
    }
})

/**
 * deleting event
 * delete from user
 * 
 */

router.delete('/delete/:eventId', isAuthenticated, async (req,res)=>{
    try{
const foundEvent = await Event.findById(req.params.eventId);
if(!foundEvent){
    return res.status(404).json({
        err: 'No Event Found'
    })
}

const foundUser = await User.findById(req.user.id) /// getting the details of logged user 
   
if(!foundUser){
    return res.status(400).json({
        err: 'User not found'
    })
}

const foundSchedule = await scheduleModel.findById(foundEvent.schedule )
if(!foundSchedule){
    return res.status(400).json({
        err: 'Schedule not found'
    })
}
await foundUser.events.pull(foundEvent);
await foundUser.save()
await foundSchedule.events.pull(foundEvent)
await foundSchedule.save()

await foundEvent.delete()
return res.status(200).json({
    msg: 'Event Deleted'
})
}catch(e){
        return res.status(500).send(e)
    }
})

module.exports = router