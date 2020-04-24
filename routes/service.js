let app = require('express');
let router  = app.Router();

const ServiceModel  = require('./../models/serviceModel').ServiceModel;

router.get('/getServices', async (req, res)=>{
    let service = new ServiceModel();
    response =  await service.getServices();
    res.json({
        result: response
    });
});

router.post("/createService", async (req, res) =>{
    console.log(req.body);
    let service = new ServiceModel(req.body);
    response = await service.createService();
    res.json({result: response});
    
})

router.post('/deleteService', async (req, res)=>{
    console.log(req.body.id);
    let service = new ServiceModel();
    response = await service.deleteService(req.body.id);
    res.json({result: response});
});

router.post('/editService', async (req, res)=>{
    console.log(req.body);
    let service = new ServiceModel(req.body);
    response = await service.editService(req.body.id);
    res.json({result: response});
});


module.exports = router;
