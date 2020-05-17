let app = require('express');
let router = app.Router();
const ProjectModel = require('./../models/ProjectModel').ProjectModel;

const t_project='project', t_activity="activity";

router.get('/getProjects', async (req, res) =>{
   let project = new ProjectModel();
    response = await project.getListProject();
    res.json({result: response});
});

router.post('/createProject', async (req, res) =>{
    console.log("asesor", req.body.nameAsesor);
    
    let project = new ProjectModel(req.body, t_project);
    response = await project.create();
    res.json({result: response});

});

router.get('/getProject', async (req, res)=>{
    let project = new ProjectModel();
    console.log(req.query.id);
    response = await project.getProjectById(req.query.id);
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

router.get('/getActivityByProjectAndPhase', async (req, res )=>{
    let project = new ProjectModel();
    let activities = [];
    let names = [];
    response = await project.getActiviesByProject(req.query.id, req.query.phase);
    console.log(response);
    if(response.length > 0){
        let nameshort='';  
        for(let i=0; i < response.length; i++){ // 2
          
            console.log(response[i].responsables);
            const responsables = response[i].responsables.split(',')
            for(let j=0; j < responsables.length; j++){
                nameshort = responsables[j].split(" ")[0].substring(0,1);
                nameshort = (nameshort + responsables[j].split(" ")[1].substring(0,1));
                names.push({
                    nameshort: nameshort,
                    responsable: responsables[j]
                });
            }
    
            
            activities.push({
                nameActivity: response[i].nameActivity,
                state: response[i].state,
                phase: response[i].phase,
                profile: names
            });
            names = [];
        }
    }

    res.json({result: activities});
});

router.post('/createActivity', async (req, res)=>{
    let project = new ProjectModel(req.body, t_activity);
    response = await project.createActivityByProject();
    res.json({result: response});
});



module.exports =  router;