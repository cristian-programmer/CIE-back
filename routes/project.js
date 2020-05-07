let app = require('express');
let router = app.Router();
const ProjectModel = require('./../models/ProjectModel').ProjectModel;

router.get('/getProjects', async (req, res) =>{
   let project = new ProjectModel();
    response = await project.getListProject();
    res.json({result: response});
});

router.post('/createProject', async (req, res) =>{
    console.log("asesor", req.body.nameAsesor);
    
    let project = new ProjectModel(req.body);
    response = await project.create();
    res.json({result: response});

});

router.get('/getParticipans', async (req, res)=>{
    console.log("participans ", req.query.id);
    let project = new ProjectModel();
    let names = [];
    response = await project.getParticipans(req.query.id);
    entrepreneurs = response[0].entrepreneurs.split(',');
    
    for(let i=0; i < entrepreneurs.length; i++){
        nameshort = entrepreneurs[i].split(" ")[0].substring(0,1);
        nameshort = (nameshort + entrepreneurs[i].split(" ")[1].substring(0,1));
        names.push({
            name: entrepreneurs[i],
            nameshort: nameshort
        });
    }

    res.json({result: { advisor: response[0].currentAdvisor, entrepreneurs: names  }});

});

router.post('/deleteProject', async (req, res)=>{
    console.log(req.body.id);
    let proyect = new ProjectModel();
    response = await proyect.deleteProject(req.body.id);
    res.json({result: response});
});

router.post('/editProject', async (req, res)=>{
    console.log(req.body);
    
    let project = new ProjectModel(req.body);
    response = await project.editProject(req.body.id);
    res.json({result: response});
});

module.exports =  router;