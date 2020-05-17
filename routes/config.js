let express = require('express');

const ConfigurationModel = require('./../models/configModel').Configuration;

router =  express.Router();


router.get('/getSystemModules', async (req, res)=>{ 
    let config = new ConfigurationModel();
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
    let config = new ConfigurationModel();
    response = await config.updateVisible(req.body);
    res.json({result: response});
});

router.get('/getModulesByRole', async (req, res)=>{
  
    let config = new ConfigurationModel();
    response = await config.getModulesByRole(req.query.role);
    res.json({result: response});
});


module.exports = router;

