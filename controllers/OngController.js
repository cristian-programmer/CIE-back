const OngModel =  require('./../models/OngModel').OngModel;


class OngController {
    constructor(data){
        this.ong = new OngModel();
        if(data != undefined) ong.setData(data);
       
    }

    async OngCreate(){
        return await this.ong.create();
    }

    async OngGetListOngs(){
        return await this.ong.getListOngs();
    }
}


module.exports = {
    OngController: OngController
}