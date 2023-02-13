const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    start:{
        type: Number,
        maxLength:10
    },end:{
        type: Number,
        maxLength:10
    },item:{
        type: String,
        maxLength:30
    },location:{
        type: String,
        maxLength:255
    },owner:{
        type: mongoose.Types.ObjectId,
        maxLength:256
    },
    allDay:{
        type:Boolean,
        require: true
    }
})

const Event = mongoose.model('event',eventSchema)

module.exports = Event