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
    let event = new EventModel(req.body);
    response = await event.editEvent(req.body.id);
    res.json({result: response});
});

router.post('/createAttendance', async (req, res)=>{
    console.log(req);
    let event = new EventModel();
    response = await event.createAttendance(req.body);
    res.json({result: response});
});

router.post('/createEventStatistics', async (req, res)=>{
    let event = new EventModel();
    response = await event.createEventStatistics(req.body);
    res.json({result: response});
});

router.post('/updateEventStatistics', async (req, res)=>{
    let event = new EventModel();
    number = await event.getNumberByEvent(req.body.id, req.body.type);
    console.log(number);
    number =  (req.body.type == 1) ? number[0].numberRegistered : number[0].numberAttendees; 
    number = number + Number(req.body.count);
    response = await event.updateEventStatics(number, req.body.id, req.body.type);
    event.closeConectionBD();
    res.json({
        result: response
    });
});
module.exports = router;
