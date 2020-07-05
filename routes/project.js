let app = require('express');
let router = app.Router();
const ProjectModel = require('./../models/ProjectModel').ProjectModel;
const UserModel = require('./../models/userModel').UserModel; 
const ManagerFile = require('./../infrastructure/ManagerFilesServer').ManagerFileServer;

const fileServer = new ManagerFile();
fileServer.saveFileInPathPublic();
const t_project='project', t_activity="activity";

router.get('/getEntrepreneurs', async (req, res) =>{
    let Entre = new ProjectModel();
    const response = await Entre.getAllEntre();
     res.json({result: response});
     
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
    let user = new UserModel();

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
    console.log("ids >", ids);
    let amount = 0;
    for(let i=0; i < ids.length; i++) {
        temp = await project.getCommentsByIdActivity(ids[i].idActivities);
        amount = amount + temp[0].amount;

    }

    console.log("amount comments > ", amount);
    return amount;
}

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


router.get('/getActivityByProjectAndPhase', async (req, res )=> {
    let project = new ProjectModel();
    let activities = [];
    let names = [];
    const response = await project.getActiviesByProject(req.query.id, req.query.phase);
    console.log(response);
    if(response.length > 0){
        let nameshort='';  
        for(let i=0; i < response.length; i++) { // 2
          
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
    const project = new ProjectModel();
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
    const project = new ProjectModel();
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

router.post('/uploadFile', fileServer.middleware().single('uploadFile'), (req, res)=>{
    console.log("uploadFile", req.file.filename);
    res.json({
        image:  req.file.path
    })
});

router.get('/getActivity', async (req, res) =>{
    const project = new ProjectModel();
    const response = await project.getActivityById(req.query.id);
    res.json({
        result: response
    });
});

router.get('/getAmountActivities/graphs', async (req, res) => {
    const project = new ProjectModel();
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
    const project = new ProjectModel();
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
    const project = new ProjectModel();
    console.log("updateRate >>> ", req.body);
    const response =  await project.updateRateActivity(req.body);
    res.json({result: response});
});

router.get('/getAmountRate', async (req, res) =>{
    const project = new ProjectModel();
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


module.exports =  router;