const Database = require('../infrastructure/ManagerConnection').Connection;

class  ServiceModel{
    
    constructor(data, operation ){
        this.database = new Database();
        this.database.getConection();

        if(data != undefined){
            this.serviceName =  data.nameService;
            this.serviceDescription = data.description;
            this.serviceImage = "path/falsy";
        }

    }

    async getServices(){
        return this.database.queryCommand(`SELECT * FROM mydb.services`);
    }

    async createService(){
        const result = await this.database.queryCommand(`insert into mydb.services
        (serviceName, serviceDescription, imageUrl) values 
        ("${this.serviceName}", "${this.serviceDescription}", "${this.serviceImage}")
        `);
        console.log(result);
        return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }

    async deleteService(id){
        const result = await this.database.queryCommand(`DELETE FROM mydb.services WHERE idServices = ${id}`);
        console.log(result);
        return result['affectedRows'] == 1 ? 'erased' :  'not-erased';
    }

    async editService(id){
        const result = await this.database.queryCommand(`UPDATE mydb.services SET serviceName="${this.serviceName}",
        serviceDescription="${this.serviceDescription}" WHERE idServices=${id} `);
        console.log(result);
        return result['changedRows'] == 1 ? 'edited' :  'not-edited';
    }



}

module.exports = {
    ServiceModel : ServiceModel
}
