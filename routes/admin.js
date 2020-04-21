let express = require('express');
const AdminController = require("../controllers/AdminController").AdminController;
let Database = require('../infrastructure/ManagerConnection').Connection;
let db = new Database();

router =  express.Router();


router.get('/list', async function(req, res){
    let admin = new AdminController();
    const adminsList = await admin.getAdminList();
    res.json({result: adminsList});
});

router.post("/create", async function(req, res){
    
    let  admin = new AdminController(req.body);

    if(admin.validate()){
        result = await admin.createAdmin(); 
        console.log(result);
        res.json({create: result});
        
        return;
    }
    res.json({create: 'no data received'});

});
router.post("/deleteAdmin", function(req, res){

});

router.post("/editAdmin", function(req, res){

});

module.exports = router;

