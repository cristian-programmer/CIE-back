let app = require('express');
let router = app.Router();

const TracingModel = require('./../models/tracingModel').TracingModel;

router.get('/getAttendance', async (req, res)=>{
    try {
        let attendance =  new TracingModel();
        response = await attendance.getAllAttendance(req.query.id);
        res.json({result : response});
    } catch (error) {
        console.error(error);
    }
   
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
    console.info("state: ", req.body.attended, "id: ", req.body.idattendance);
    const response = await attendance.updateAttended(req.body.idattendance, req.body.attended);
    res.json({
        result: response
    })
});

router.get('/getLastActivitySystem', async (req, res)=>{
    let tracing = new TracingModel();
    response = await tracing.getLastActivitySystem(req.query.idUser);
    res.json({result: response});
});

router.post('/createLastActivitySystem', async (req, res)=>{
  
    let tracing = new TracingModel();
    response =  await tracing.createLastActivitySystem(req.body);
    console.log(response);
    res.json({result:response});
});

module.exports = router;