let chai = require('chai');
app = require('../app');
let clientChaiHtpp = require("chai-http");
const expect = require('chai').expect;

chai.use(clientChaiHtpp);


describe('create a admin', function(){
    it('Should create a admin', function(done){
        chai.request(app).post("/users/test")
        .send({id: 0})
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        });
    });
});