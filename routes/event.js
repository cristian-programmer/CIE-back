let app = require('express');
let router = app.Router();

const EventModel = require('./../models/eventModel').EvenModel;
const FileServer = require('../infrastructure/ManagerFilesServer').ManagerFileServer;

const fileServer =  new FileServer();
fileServer.prepareStorageS3();

// const event = new EventModel();


router.post('/createEvent',async (req, res)=>{
    console.log(req.body);
    console.log(req.body.date);
    let event = new EventModel();
    event.setEvent(req.body);
    response = await event.create();
    let id = await event.getLastInsertId();

    res.json({result: response, id: id[0].idEvents});
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
    response = await event.createEventStatistics(req.body.idEvent);
    console.log("create statistics ", response);
    res.json({result: response});
});

router.post('/updateEventStatistics', async (req, res)=>{
    let event = new EventModel();
    number = await event.getNumberByEvent(req.body.id, req.body.type);
    console.log("number", number);
    if(number.length > 0) {
       
        number =  (req.body.type == 1) ? number[0].numberRegistered : number[0].numberAttendees; 
        number = number + Number(req.body.count);
        response = await event.updateEventStatics(number, req.body.id, req.body.type);
        event.closeConectionBD();
        res.json({
            result: response
        });
    }   
    
});

router.get('/getEventStatistics', async (req, res)=>{
    let event = new EventModel();
    let data_statistics = [];
    statistics = await event.getEventStatistcs();
    for(let i=0; i < statistics.length; i ++) {
        event_r = await event.getEventById(statistics[i].idEvent);
        if(event_r.length == 1){   
        data_statistics.push({
            eventName: event_r[0].eventName,
            eventDate: event_r[0].eventDate,
            numberRegistered: statistics[i].numberRegistered
        });
        }
    }
    res.json({result: data_statistics});
});

router.post('/uploadFile', fileServer.middleware().single('eventFile'), async (req, res)=>{
    console.log("uploadFile", req.file.filename);

    const uploaded = await fileServer.uploadS3File(req.file);

    res.json({
        image:  uploaded.Location
    })
});

router.get('/getRegisteredByEvent', async (req, res)=>{ 
    const event = new EventModel();
    const events = await event.getAllEvents();
    let data = [];
    let labels = [];
    for(let i=0; i < events.length; i++){
        labels.push(events[i].eventName);
        const statistics = await event.getEventStatistcsById(events[i].idEvents);
        console.info("ID: ", events[i].idEvents, "numbers: ", statistics);
        data.push(
            statistics[0].numberRegistered
        );
    }

    const response = {
        labels: labels,
        data: data
    };

    res.json({
        result: response
    })
    
    console.log(response);
});

module.exports = router;
