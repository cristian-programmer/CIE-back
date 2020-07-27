var express = require('express');
var router = express.Router();
const JsonWebToken = require('./../controllers/JsonWebToken').JsonWebToken;
const userModel = require('../models/userModel').UserModel;
const projectModel = require('../models/ProjectModel').ProjectModel;
const managerFilesServer = require('../infrastructure/ManagerFilesServer').ManagerFileServer;

const PORTCLIENT = 3000;

const jwt = new JsonWebToken();
const manager = new managerFilesServer();

manager.prepareStorageS3();


let idProfile = 0;

router.post('/createUser' ,async (req, res)=>{
  console.log(req.body);
  register = true;
  let user = new userModel(req.body, register);
  response = await user.create();
  res.json({result: response});

});

router.post('/login', async (req, res) => {

  let user = new userModel();
  response = await user.getUser(req.body.username, req.body.password);
  if(response.length > 0) {
    const userdata  = { user: req.body.username, password: req.body.password };
    const token = jwt.createSign(userdata, process.env.TOKEN , {expiresIn: 1440});
    res.json({
      result: response,
      login: true,
      token: token
    });
    
  }else{
    res.json({login: false});
  }
  console.log("req", response);
  res.status(200);
});

router.get('/admin/getAllUsers', async (req, res)=>{
  let user = new userModel();
  response = await user.getAllUsers();
  res.json({result: response});
});

router.post('/admin/updateRole', async (req, res)=>{
  console.log(req.body);
  let user = new userModel();
  response = await user.updateRole(req.body);
  res.json({result: response});
});


router.post('/writeIdProfile', (req, res) =>{
  console.log(req.body.id);

  idProfile = req.body.id;
  res.json({
    result: 'assigned'
  });
});

function getKeyUrl(url) {
  const content = url.split('/');

  return content[content.length -1];
}

router.post('/uploadProfile', manager.middleware().single('profile'),  async (req, res)=>{
  console.log(req.body);
  let user = new userModel();
  let response = null;
  
  const userFound = await user.getUserById(idProfile);
  console.log('user found  >>>> ', userFound[0].image);
  if(userFound[0].image != null) {
    const key = getKeyUrl(userFound[0].image);
    const deleted = await manager.deleteS3File(key);
    console.log("deleted >>>> ", deleted);

    const uploaded = await manager.uploadS3File(req.file);
    response = await user.updateProfileImage({
      path:uploaded.Location,
      id: idProfile
    });
  }else {
    const uploaded = await manager.uploadS3File(req.file);
    console.log("s3 >>>>  ", uploaded.Location);
    response = await user.updateProfileImage({
      path: uploaded.Location ,
      id: idProfile
    });
  }
  
  if(response == 'edited') {
    res.json({
      image: req.file.path
    })
  }else {
    console.error("error adding image path to DB");
  }

});

router.get('/getUserById',  async (req, res)=>{
  let user = new userModel();
  let project = new projectModel();

  response =  await user.getUserById(Number(req.query.id));

  participans = await project.getAllParticipants();


  // console.log(findUserInAproject(response[0].name, participans));

  console.log("getUserById" , response);
  res.json({
    result : response,
    project:  (participans.length > 0) ? findUserInAproject(response[0].name, participans) : null
  });
});


function findUserInAproject(user, project){
  for(let i=0; i< project.length; i++){
    if(project[i].currentAdvisor != undefined){
      if(user == project[i].currentAdvisor){
        console.log("entre");
        return {
          projectName: project[i].projectName,
          rol : 'Lider de proyecto'
        };
      }
    }
  }
  let names = [];
  for(let i=0; i < project.length; i++){
    try {
      if(project[i].enterpreneurs != undefined)
          names = (project[i].enterpreneurs).split(",");
          
    } catch (error) {
      console.error(error);
      return {
        projectName: '',
        rol : ''
      };
    }
    
    for(let j=0; j < names.length; j ++){
       if(user == names[i])
       return {
          projectName: project[i].projectName,
          rol : 'Participante'
      };
    }
  }

  return {
    projectName: 'No ha participado en un proyecto',
    rol : 'ninguno'
  };
}

router.post('/editUser', async (req, res) => {
  let user = new userModel();
  try {
    response = await user.editUser(req.body);
  res.json({
    result: response
  })
  } catch (error) {
    console.error(error);
  }
});


router.get('/getAllAdvisers', async (req, res) => {
  const user = new userModel();
  const response = await user.getAllUsersByRole();
  res.json({
    result: response
  })
});
module.exports = router;
 