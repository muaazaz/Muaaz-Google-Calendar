const express = require('express')
const controller = require('../controllers/eventCont')
const auth = require('../middleware/auth')
const router = express.Router()

//To create a new event in DB
router.post('/event',auth, controller.create_event)
//To fetch all timely events
router.get('/events',auth, controller.get_events)
//TO get an event to edit
router.get('/event/:id',auth, controller.get_a_event)
//To delete a event from db
router.delete('/event/:id',auth, controller.delete_event)
//To edit a timely event in DB
router.put('/event/:id',auth, controller.edit_event)



module.exports = router