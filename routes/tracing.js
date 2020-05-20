let app = require('express');
let router = app.Router();

const TracingModel = require('./../models/tracingModel').TracingModel;

router.post('/getAttendance', async (req, res)=>{
    let attendance =  new TracingModel();
    response = await attendance.getAllAttendance(req.body.id);
    res.json({result : response});
}); 


router.get('/getEvents', async (req, res)=>{
    let event =  new TracingModel();
    response = await event.getAllEvents();
    res.json({result : response});
}); 


router.post('/updateAttendance', async (req, res)=>{
    console.log(req.body);
    
    let attendance = new TracingModel(req.body);
    response = await attendance.updateAttendance(req.body.idattendance);
    res.json({result: response});
});

router.post('/updateAttended', async (req, res) =>{
    let attendance = new TracingModel();
    response = await attendance.updateAttended(req.body.id, req.body.attended);
    res.json({
        result: response
    })
});

module.exports = router;