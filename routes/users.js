var express = require('express');
var router = express.Router();
let  JsonWebToken = require('./../controllers/JsonWebToken').JsonWebToken;

let jwt = new JsonWebToken();

router.post('/auth-token', function(req, res, next){
  const userdata  = { user: req.body.user, password: req.body.password };
  const token = jwt.createSign(userdata, process.env.TOKEN , {expiresIn: 1440});
  res.json({token : token});
});

router.post('/test', jwt.authorizeRute, function(req, res, next) {
  console.log("req");
  res.status(200).send("ok");
});

module.exports = router;
