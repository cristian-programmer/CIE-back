let app = require('express');
const { response } = require('express');
let router = app.Router();
const ProjectModel = require('./../models/ProjectModel').ProjectModel;
const UserModel = require('./../models/userModel').UserModel; 

const t_project='project', t_activity="activity";

router.get('/getEntrepreneurs', async (req, res) =>{
    let Entre = new ProjectModel();
    const response = await Entre.getAllEntre();
     res.json({result: response});
     //console.log("aaaaa", response);
     
 });

 router.post('/getProjects2', async (req, res) =>{
    let project = new ProjectModel(req.body, t_project);
    const response = await project.getListProject(req.query.nameAsesor);
     res.json({result: response});
     
 });


router.get('/getProjects', async (req, res) =>{
   const project = new ProjectModel();
   const typeUser =  req.query.type;
   const name = req.query.name;

   let response = [];
   if(typeUser == 'adviser'){
        try {
            response = await project.getPorjectsByCurrentAvisor(name);
            res.json({result: response});
        } catch (error) {
            console.log(error);
        }
   }else {
        try {
            response = await project.getAllProjects();
            res.json({
                result: response
            });
        } catch  (error) {
            console.log(error);
        }
   }
   
});

router.post('/createProject', async (req, res) =>{
    console.log("asesor", req.body.nameAsesor);
    
    const project = new ProjectModel(req.body, t_project);
    const response = await project.create();
    res.json({result: response});

});

router.get('/getProject', async (req, res)=>{
    let project = new ProjectModel();
    console.log(req.query.id);
    const response = await project.getProjectById(req.query.id);
    res.json({result: response});
});

router.get('/getParticipans', async (req, res)=>{
    console.log("participans ", req.query.id);
    const  project = new ProjectModel();
    let names = [];
    let response = await project.getParticipans(req.query.id);
    let entrepreneurs = response[0].entrepreneurs.split(',');
    console.log(entrepreneurs);
    for(let i=0; i < entrepreneurs.length; i++){
        if( entrepreneurs[i].split(" ").length > 1){
            nameshort = entrepreneurs[i].split(" ")[0].substring(0,1);
            nameshort = (nameshort + entrepreneurs[i].split(" ")[1].substring(0,1));
        }else {
            nameshort = entrepreneurs[i].split("")[0];
        }
       
        names.push({
            name: entrepreneurs[i],
            nameshort: nameshort
        });
    }

    res.json({result: { advisor: response[0].currentAdvisor, entrepreneurs: names  }});

});

router.post('/deleteProject', async (req, res)=>{
    console.log(req.body.id);
    const  proyect = new ProjectModel();
    const response = await proyect.deleteProject(req.body.id);
    res.json({result: response});
});

router.post('/editProject', async (req, res)=>{
    console.log("request",req.body);
    
    let project = new ProjectModel(req.body,t_project);
    const response = await project.editProject(req.body.id);
    res.json({result: response});
});

router.get('/getActivityByProjectAndPhase', async (req, res )=>{
    let project = new ProjectModel();
    let activities = [];
    let names = [];
    const response = await project.getActiviesByProject(req.query.id, req.query.phase);
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
                id: response[i].idActivities,
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
    console.log("ACTIVITY_  ", req.body);
    const project = new ProjectModel(req.body, t_activity);
    const response = await project.createActivityByProject();
    res.json({result: response});
});

router.get('/getAmountActivities', async (req, res)=>{
    const project = new ProjectModel();
    const phase = req.query.phase;
    console.log(phase);
    const response = await project.getActivitiesByPhase(phase);
    console.log(response);
    res.json({result: response.length});

});

router.post('/comment/add', async (req, res)=>{
    const project = new ProjectModel();
    console.log("commentary ", req.body);
    project.createCommentary(req.body);
});


router.get('/getComments', async (req, res) => {
    const project = new ProjectModel();
    const user = new UserModel();
    console.log("idActivity: " , req.query.idActivity);
    const response = await project.getCommentsByIdActivity(req.query.idActivity);
    const comments = [];
    for(let i=0; i< response.length; i++){
        let userFound = await user.getUserById(Number(response[i].idUsers));
        comments.push({
            author: userFound[0].name,
            avatar : userFound[0].image,
            content: response[i].commentary,
            datetime: new Date()

        });
    }
    console.log(comments);
    res.json({
        result: comments
    });
});

module.exports =  router;