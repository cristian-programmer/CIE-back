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

router.get('/entrepreneursServed', async (req, res) =>{
    const total =  await tracing.getTotal();
    const pratice = await tracing.getAmountByColumn('1');
    const gradeOption = await tracing.getAmountByColumn('2');
    const internationalization = await tracing.getAmountByColumn('3');
    const extern = await tracing.getAmountByRelationship('external');
    const graduate = await tracing.getAmountByRelationship('graduate');
    const labels = new Array('praticas', 'opcion de grado', 
    'internacionalizacion', 'externo', 'egresado', 'total');

    const data = new Array(pratice[0].amount, 
        gradeOption[0].amount, internationalization[0].amount,
        extern[0].amount, graduate[0].amount, total[0].total );
    console.log(data);
    console.log(labels);
    res.json({
        labels: labels,
        data: data
    });
});


router.get('/entrepreByProgram', async (req, res)=>{
    let programs = new Map();
    const students = await tracing.getAcademicPrograms();
    let data = [];
    let labels = [];

    for(let i=0; i < students.length; i++){
        console.log(students[i]);
        programs.set(i, students[i].academicProgram);
    }

    for(let value of programs.values()){
        console.log(value);
        const amount = await tracing.getAmountProgram(value);
        console.log(amount);
        labels.push(value);
        data.push(amount[0].amount);
    }
    

    res.json({
        labels: labels,
        data: data
    });


});

module.exports = router;