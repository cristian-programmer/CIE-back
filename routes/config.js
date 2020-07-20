let express = require('express');

const ConfigurationModel = require('./../models/configModel').Configuration;

const config = new ConfigurationModel();
const router =  express.Router();


router.get('/getSystemModules', async (req, res)=>{ 
    
    response = await config.getSystemModules();
    console.log(response);

    let tempAdviser  = [];
    let tempAssistant = [];
    let tempEntrepreneur =[];

    for(let i=0; i < response.length; i++){
        data = {name: response[i].nameModule, active: response[i].active, id: response[i].idSystemModules};
        if(response[i].role == "adviser") {
            tempAdviser.push(data);
        }else if(response[i].role == "assistant"){
            tempAssistant.push(data);
        }else if(response[i].role == "entrepreneur"){
            tempEntrepreneur.push(data);
        }
    }

    res.json({result: { adviser: tempAdviser,
         assistant: tempAssistant,
         entrepreneur: tempEntrepreneur }
        });
});

router.post('/createModules', async (req, res)=>{
    let config = new ConfigurationModel(req.body);
    response = await config.createModules();
    res.json({result: response});
});

router.post('/updateVisible', async (req, res)=>{
    response = await config.updateVisible(req.body);
    res.json({result: response});
});

router.get('/getModulesByRole', async (req, res)=>{
    response = await config.getModulesByRole(req.query.role);
    res.json({result: response});
});

router.get('/facebook', async (req, res) =>{    
    response = await config.getConfigFacebook();
    res.json({
        result: response
    });
});

router.post('/facebook', async (req, res)=> {
    try {
        const acounts = await config.getConfigFacebook();
        let response = null;
        if(acounts.length > 0) {
            response = await config.updateConfigFacebook(req.body);
        }else {
            response = await config.createConfigFacebook(req.body);
        } 
    
        res.json({
            result: response
        });
    } catch (error) {
        console.error(error);
    }
   
});


router.get('/email', async (req, res) => {
    const response = await config.getConfigEmail();
    res.json({
        result: response
    });
});

router.post('/email', async (req, res) => {
    try {
        const acounts = await config.getConfigEmail();
        let response = null;
        if(acounts.length > 0) {
            response = await config.updateConfigEmail(req.body);
        }else {
            response = await config.createConfigEmail(req.body);
        } 

        res.json({
            result: response
        });
    } catch (error) {
        console.error(error);
    }
    
});

router.post('/deleteUser', async (req, res) => {
    const response = await config.deleteUser(req.body.id);
    res.json({ result:response });
});


module.exports = router;

