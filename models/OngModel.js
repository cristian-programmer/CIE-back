const Database = require('./../infrastructure/ManagerConnection').Connection;
const S3 = require('./../infrastructure/ManagerS3File').ManagerS3File;

class OngModel {

    constructor(){
        this.database = new Database();
        this.database.getConection();
        this.name="";
        this.logo = null;
        this.ongObjectives="";
        this.affectedCommunity="";
        this.ongDescription="";
        this.purposeDonatinos="";
        this.location="";
        this.sponsors="";
        this.paymentGatewayLink="";
        this.account="";
        this.shippingInstructions="";
        this.websiteOng="";
        this.linkWhatsapp="";
        this.linkInstagram="";
        this.linkFacebook="";
        this.twitter="";
        this.linkedin="";
    }

    async getListOngs(){
        return await this.database.queryCommand('SELECT * FROM gentem.ong');
    }

    saveFileAsS3File(){
        const s3 = new S3(this.logo);
        s3.saveFile();
    }


    async create(){

        const result = await this.database.queryCommand(`INSERT INTO gentem.ong ()
         VALUES()`);

         return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }

    setData(){

    }

    validate(){

    }

}

module.exports = {
    OngModel : OngModel
}