let app = require('express');
let router = app.Router();

const EventModel = require('./../models/eventModel').EvenModel;

router.post('/createEvent',async (req, res)=>{
    console.log(req.body);
    console.log(req.body.date);
    let event = new EventModel(req.body);
    response = await event.create();

    res.json({result: response});
});

router.get('/getEvents', async (req, res)=>{
    let event =  new EventModel();
    response = await event.getAllEvents();
    res.json({result : response});
}); 

router.post('/deleteEvent', async (req, res)=>{
    console.log(req.body.id);
    let event = new EventModel();
    response = await event.deleteEvent(req.body.id);
    res.json({result: response});
});

router.post('/editEvent', async (req, res)=>{
    console.log("jjjj",req.body);
    let event = new EventModel(req.body);
    response = await event.editEvent(req.body.id);
    res.json({result: response});
});

module.exports = router;
