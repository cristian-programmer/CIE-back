let jwt = require("jsonwebtoken");

class JsonWebToken{
    constructor(){
        this.key = process.env.TOKEN;
        this.token = null;
    }

    createSign(data){
      this.token = jwt
      .sign(data, this.key, {expiresIn:1440});

      return this.token;
    }

    authorizeRute(req, res, next){
        const token = req.headers['access-token'];
        if(token){
            jwt.verify(token, process.env.TOKEN , function(err, decoded){
                if(err) res.json({message: 'invalid-Token'});
                req.decoded = decoded;
                next();
            });
        }else {
            res.json({message:'no-Token'});
        }
    }
}

module.exports = {
    JsonWebToken : JsonWebToken
};