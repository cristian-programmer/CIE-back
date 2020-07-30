let app = require('express');
let router = app.Router();

const ProjectModel = require('./../models/ProjectModel').ProjectModel;
const UserModel = require('./../models/userModel').UserModel; 
const ManagerFile = require('./../infrastructure/ManagerFilesServer').ManagerFileServer;

const fileServer = new ManagerFile();
fileServer.prepareStorageS3();
const project  = new ProjectModel();
let  urlResource = null;

router.get('/getEntrepreneurs', async (req, res) =>{
    const response = await project.getAllEntre();
     res.json({result: response});
     
 });

 router.post('/getProjects2', async (req, res) =>{
    console.log(req.body);
    const response = await project.getListProject(req.body.nameAsesor);
     res.json({result: response});
 });

router.get('/getProjects', async (req, res) =>{
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
   }else if (typeUser == 'administrator') {
        try {
            response = await project.getAllProjects();
            res.json({
                result: response
            });
        } catch  (error) {
            console.log(error);
        }
   }else if (typeUser == 'entrepreneur') {
       response = await project.getAllProjects();
       let invited = [] ;
       for(let i=0; i < response.length; i++){
        
        let entrepreneurs = (response[i].entrepreneurs).split(',');
        console.log("1 entrepreneurs >>>>", response[i]);
        if(entrepreneurs != undefined){
            if(entrepreneurs.includes(name)) {
                console.log(" 2 entrepreneurs >>>>", response[i] );
                invited.push(response[i]);
                
            }
        }

       }
       console.log("invited >>>", invited.length);

       if(invited.length == 0 ){
           invited.push({
            idProject: 1,
            projectName : 'No ha sido invitado a un proyecto'
           });
       }
       res.json({
           result: invited
       });  
   }
   
});

router.post('/createProject', async (req, res) =>{
    console.log("asesor", req.body.nameAsesor);
    
    project.setProject(req.body);
    const response = await project.create();
    res.json({result: response});

});

router.get('/getProject', async (req, res)=>{
    console.log(req.query.id);

    const response = await project.getProjectById(req.query.id);
    const phases = (response[0].methodologicalPhases).split(',');

    const methodology = await findMethodology(phases, project, req.query.id);

    delete response[0]['methodologicalPhases'];

    console.log("response: ",response);
    console.log("r_phases: ", methodology);

    res.json({
        result: response, 
        phases: methodology
    });
});

async function findMethodology( phases, project, id) {
    let content = [];
    for(let i=0; i < phases.length; i++){
        const result = await project.getActivitiesByIdProject(phases[i], id);
        const amountComments = await getCountComments(phases[i], id, project);
       
        content.push({
            nameAssigned : "",
            image: "",
            phase: phases[i],
            amountActivities: result[0].amount,
            amountComments:amountComments});
        
    }

    return content;
}

async function getCountComments(phase, id, project) {
    const ids = await project.getIdActivities(phase, id);
    console.log("ids >>>> ", ids);
    let amount = 0;
    for(let i=0; i < ids.length; i++) {
        temp = await project.getCommentsByIdActivity(ids[i].idActivities);
        amount = amount + temp[0].amount;

    }

    console.log("amount comments > ", amount);
    return amount;
}

router.get('/getParticipans', async (req, res)=>{
    console.log("participans >>>> ", req.query.id);
   
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

    const response = await project.deleteProject(req.body.id);
    res.json({result: response});
});

router.post('/editProject', async (req, res)=>{
    console.log("request >>>>",req.body);
    
    project.setProject(req.body);
    const response = await project.editProject(req.body.id);
    res.json({result: response});
});


router.get('/getActivityByProjectAndPhase', async (req, res )=> {
   
    let activities = [];
    let names = [];
    const response = await project.getActiviesByProject(req.query.id, req.query.phase);
    console.log("get activitivities >>>", response);
    if(response.length > 0){
        let nameshort='';  
        for(let i=0; i < response.length; i++) { 
          
            console.log(response[i].responsables);
            const responsables = response[i].responsables.split(',')
            console.log("responsables >>>", responsables);
            for(let j=0; j < responsables.length; j++){
                console.log("split('') >>" , responsables[j].split(" "));
                if( responsables[j].split(" ").length > 2){
                    nameshort = responsables[j].split(" ")[0].substring(0,1);
                    nameshort = (nameshort + responsables[j].split(" ")[1].substring(0,1));
                }else{
                    nameshort = responsables[j].split("")[0];
                }
                
                names.push({
                    nameshort: nameshort,
                    responsable: responsables[j]
                });
            }
    
            
            activities.push({
                id: response[i].idActivities,
                nameActivity: response[i].nameActivity,
                description: response[i].description,
                state: response[i].state,
                phase: response[i].phase,
                profile: names,
                percentaje : response[i].percentaje

            });
            names = [];
        }
    }

    res.json({result: activities});
});

router.post('/createActivity', async (req, res)=>{
    console.log("activity >>>>  ", req.body);
   
    project.setActivity(req.body);
    project.setResource(urlResource);
    const response = await project.createActivityByProject();
    res.json({result: response});
});

router.get('/getAmountActivities', async (req, res)=>{
   
    const phase = req.query.phase;
    console.log(phase);
    const response = await project.getActivitiesByPhase(phase);
    console.log(response);
    res.json({result: response.length});

});

router.post('/comment/add', async (req, res)=>{
    
    console.log("commentary ", req.body);
    project.createCommentary(req.body);
});


router.get('/getComments', async (req, res) => {
   
    const user = new UserModel();
    console.log("idActivity: " , req.query.idActivity);
    const response = await project.getCommentsIdUsers(req.query.idActivity);
    console.log("response > ", response);
    const comments = [];
    for(let i=0; i< response.length; i++){
        let userFound = await user.getUserById(response[i].idUsers);
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

router.post('/createAssignment', async (req, res) => {
    console.log(req.body);
  
    const exists =  await project.getAssignmentByAll(req.body);
    console.log("exists: ", exists);
    let response;
    if(exists.length > 0 ){
        response = await project.updateAssignment(req.body);
        res.json({result : response})
    }else {
        
        response = await project.createAssignment(req.body);
        res.json({result : response})
    }
   

});

router.get('/getAssignment', async (req, res)=>{
   
    const user = new UserModel();
    if(req.query.id != "" && req.query.phase != "") {
        try {
            const response = await project.getAssignment(req.query.id, req.query.phase);
            const userFound = await user.getUserById(response[0].idAdviser);
            res.json({
                result: {
                    nameAssigned: userFound[0].name,
                    image: userFound[0].image,
                }
            })
        } catch (error) {
            res.json({
                result: {
                    nameAssigned: "",
                    image: null
                }
            })
        }

    }else {
        res.json({
            result: {
                nameAssigned: "",
                image: null
            }
        })
    }
});

router.post('/uploadFile', fileServer.middleware().single('uploadFile'), async (req, res)=>{
    console.log("uploadFile", req.file.originalname);
    const uploaded = await fileServer.uploadS3File(req.file, 'resource');
    console.log("uploaded >>>>", uploaded);
    urlResource = uploaded.Location;
    res.json({
        resource:  req.file.path
    });
});

router.get('/getActivity', async (req, res) =>{
  
    console.log("here >>>", req.query.id);
    const response = await project.getActivityById(req.query.id);
    res.json({
        result: response
    });
});

router.get('/getAmountActivities/graphs', async (req, res) => {
   
    const response = await project.getProjectById(req.query.idProject);
    const phases = (response[0].methodologicalPhases).split(',');
    console.log("phases >> ", phases);
    let labels = [];
    let data = [];
    for(let i=0; i< phases.length; i++){
        result = await project.getActivitiesByIdProject(phases[i], req.query.idProject);
        console.log("amount >> ", result[0].amount);
        labels.push(phases[i]);
        data.push(result[0].amount);
    }

    res.json({
        labels: labels,
        data: data
    });

});

router.get('/getAmountStateActivities', async (req, res) =>{
    
    const response = await project.getAllActivitiesByIdProject(req.query.idProject);
    let labels = new Array('En ejecución' , 'Terminado', 'Detenido');
    let amount1 = 0;
    let amount2 = 0;
    let amount3 = 0;
    for(let i=0; i< response.length; i++) {
        console.log("states >> ", response[i].state);
        
        if(response[i].state == '1') {
            console.log(">>>>", amount1);
            amount1++
        }else if (response[i].state == '2') {
            amount2++;
        }else if (response[i].state == '3'){
            amount3++;
        }   
    }
    let data = new Array(amount1, amount2, amount3);

    res.json({
        labels: labels,
        data: data
    });
    
});

router.post('/updateRate', async (req, res) =>{
   
    console.log("updateRate >>> ", req.body);
    const response =  await project.updateRateActivity(req.body);
    res.json({result: response});
});

router.get('/getAmountRate', async (req, res) =>{
   
    const response = await project.getAllActivitiesByIdProject(req.query.idProject);
    const labels = new Array('Malo', 'Regular', 'Bueno', 'Excelente');
    let bad = 0;
    let regular = 0;
    let good = 0;
    let excelent = 0;

    for(let i=0; i < response.length; i++) {
        rate = response[i].rate;
        if(rate == 1){
            bad++;
        }else if (rate == 2){
            regular++;

        }else if(rate==3){
            good++;
        }else if(rate==4){
            excelent++;
        }
    }

    const data = new Array(bad, regular, good, excelent);

    res.json({
        labels: labels,
        data: data
    })
});

router.get('/phases',async (req, res) =>{
    
    const response =  await project.getPhases(req.query.id);
    res.json({
        result: response[0]
    })
});

router.get('/activities/gantt', async (req, res) =>{
   
    const response = await project.getActiviesByProject(req.query.id, req.query.phase);
    res.json({result: response});
});


router.post('/percentaje', async (req, res) => {
    console.log('percentaje >>>> ', req.body);
    const response = await project.updatePercentaje(req.body);
    res.json({
        result: response
    });
});

module.exports =  router;