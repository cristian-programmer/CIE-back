const Database = require('../infrastructure/ManagerConnection').Connection;

class  TracingModel{
    
    constructor(tracing){
        this.database = new Database();
        this.database.getConection();

        if(tracing != undefined){
            this.confirmedAssistance =  tracing.confirmedAssistance;
        }
    }

    async getAllAttendance(id){
        console.log(id);
        return await this.database.queryCommand(`SELECT * FROM mydb.attendance WHERE idEvent = ${id}`);
   }

   async getAllEvents(){
    return await this.database.queryCommand(`SELECT * FROM mydb.events`);
}

async updateAttendance(id){    
    const result = await this.database.queryCommand(`UPDATE mydb.attendance SET confirmedAssistance ="${this.confirmedAssistance}" WHERE idattendance=${id} `);
    console.log(result);

}

}

    module.exports = {
        TracingModel : TracingModel
    }
    