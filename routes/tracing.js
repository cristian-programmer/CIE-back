let app = require('express');
let router = app.Router();

const TracingModel = require('./../models/tracingModel').TracingModel;
const tracing = new TracingModel();

router.get('/getAttendance', async (req, res)=>{
    try {
        const response = await tracing.getAllAttendance(req.query.id);
        res.json({result : response});
    } catch (error) {
        console.error(error);
    }
   
}); 


router.get('/getEvents', async (req, res)=>{
    const response = await tracing.getAllEvents();
    res.json({result : response});
}); 


router.post('/updateAttendance', async (req, res)=>{
    console.log(req.body);
    const response = await tracing.updateAttendance(req.body.idattendance, req.body.confirm);
    res.json({result: response});
});

router.post('/updateAttended', async (req, res) =>{
    
    console.info("state: ", req.body.attended, "id: ", req.body.idattendance);
    const response = await tracing.updateAttended(req.body.idattendance, req.body.attended);
    res.json({
        result: response
    })
});

router.get('/getLastActivitySystem', async (req, res)=>{
    const response = await tracing.getLastActivitySystem(req.query.idUser);
    res.json({result: response});
});

router.post('/createLastActivitySystem', async (req, res)=>{
    const response =  await tracing.createLastActivitySystem(req.body);
    console.log(response);
    res.json({result:response});
});

router.get('/Statistics', async (req, res) => {
    const type = req.query.type;
    if(type == 1){
        const response = await tracing.getAmountConfirmed(req.query.id);
        res.json({
            result: response
        });
    }
});

module.exports = router;