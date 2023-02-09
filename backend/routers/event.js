const express = require('express')
const controller = require('../controllers/eventCont')
const router = express.Router()

//To create a new event in DB
router.post('/event', controller.create_event)
//To fetch all timely events
router.get('/events', controller.get_events)
//TO get an event to edit
router.get('/event/:id', controller.get_event_details)
//To delete a event from db
router.delete('/event/:id', controller.delete_event)
//To edit a timely event in DB
router.put('/event/:id', controller.edit_event)



module.exports = router