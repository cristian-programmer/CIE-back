let app = require('express');
let router = app.Router();
const OngController = require('./../controllers/OngController').OngController;

router.get('/list', async function(req, res){
    const ong = new OngController();
    const result = await ong.OngGetListOngs();
    res.json({ongs: result});
});

router.post('/create', function(req, res){
    
});

router.post('/edit', function(req, res){

});

module.exports =  router;