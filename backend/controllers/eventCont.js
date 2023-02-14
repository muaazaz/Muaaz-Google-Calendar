const Event = require('../models/event')

const create_event = async(req, res)=>{

    try {
        const event = new Event(req.body)
        await event.save()
        res.status(201).send({event})
    } catch (err) {
        var error = err.message
        res.status(500).send({error})  
    }
}
const get_events = async(req, res)=>{
    try {
        const allDayEvents =await Event.find({allDay: true, owner: req.user._id}).sort({createdAt: 1})
        const timelyEvents =await Event.find({allDay: false, owner: req.user._id}).sort({start:1})
        res.send({allDayEvents, timelyEvents})
    } catch (e) {
        const error = e.mesaage
        res.send({error})
    }
}
const get_event_details = async(req, res)=>{
    try {
        const event = await Event.findOne({_id:req.params.id})
        res.send({event})
    } catch (e) {
        const error = e.mesaage
        res.send({error})
    }
}


const delete_event = async(req, res)=>{
    try {
        const id = req.params.id
        await Event.findByIdAndDelete(id)
    } catch (e) {
        if(req.error){
            const error = req.error.mesaage
            return res.send({error})
        }
        const error = e.mesaage
        res.send({error})
    }
}

const edit_event = async(req,res)=>{
    try {
        const id = req.params.id
        const event = await Event.findById(id)
        event.start = req.body.start
        event.end = req.body.end
        event.item = req.body.item
        event.location = req.body.location
        await event.save()
        res.status(200).send({event})
    } catch (e) {
        if(req.error){
            const error = req.error.mesaage
            return res.send({error})
        }
        const error = e.mesaage
        res.send({error})
    }
}

module.exports = {
    create_event,
    get_event_details,
    get_events,
    delete_event,
    edit_event
}