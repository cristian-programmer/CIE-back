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
        return await this.database.queryCommand(`SELECT * FROM mydb.Attendance WHERE idEvent = ${id}`);
   }

   async getAllEvents(){
    return await this.database.queryCommand(`SELECT * FROM mydb.events`);
    }

    async updateAttendance(id, confirmed){    
        const result = await this.database.queryCommand(`UPDATE mydb.Attendance SET confirmedAssistance=${confirmed == true ? 1 : 0} WHERE idattendance=${id} `);
        console.log(result);
        console.log(`UPDATE mydb.Attendance SET 
        confirmedAssistance=${confirmed == true ? 1 : 0} WHERE idattendance=${id}`);
        return result['changedRows'] == 1 ? 'edited' :  'not-edited';

    }

    async updateAttended(id, attend){
        console.log(id," --- ", attend);
        const result = await this.database.queryCommand(`UPDATE mydb.Attendance SET attended=${attend == true ? 1 : 0} WHERE idattendance=${id} `);
        console.log(`UPDATE mydb.Attendance SET attended=${attend}
        WHERE idattendance=${id}`);
        console.log(result);
        return result['changedRows'] == 1 ? 'edited' :  'not-edited';
    }

    async countAttendend(){
        return await this.database.queryCommand(`SELECT COUNT(*) FROM mydb.Attendance WHERE attended =1`)
    }

    async getLastActivitySystem(idUser){
        return await this.database.queryCommand(`SELECT * FROM mydb.lastActivitySystem WHERE idUser=${idUser}`);
    }

    async createLastActivitySystem(data){
        const hour =  `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}` 
        const result = await this.database.queryCommand(`INSERT INTO mydb.lastActivitySystem (idUser, activity, date, hour)
             values (${data.idUser}, "${data.activity}", "${new Date().toLocaleDateString()}", "${hour}")`);
        
        return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }

    async getAmountConfirmed(id) {
        return await this.database.queryCommand(`SELECT COUNT(*) AS 
        amount FROM  mydb.Attendance WHERE idEvent=${id} AND confirmedAssistance=1`)
    }

    async getTotal(){
        return await this.database.queryCommand(`SELECT COUNT(*) AS total FROM mydb.Users
        WHERE relationshipUniversity='student' OR relationshipUniversity='external' OR 
        relationshipUniversity='graduate'`)
    }

    async getAmountByColumn(type){
        return await this.database.queryCommand(`SELECT COUNT(*) AS amount FROM mydb.Students
        WHERE incomeBy=${type}`)
    }

    async getAmountByRelationship(relationship){
        return await this.database.queryCommand(`SELECT COUNT(*) AS amount FROM mydb.Users
        WHERE  relationshipUniversity='${relationship}'`);
    }

    async getAcademicPrograms(){
        return await this.database.queryCommand(`SELECT academicProgram FROM mydb.Students`);
    }

    async getAmountProgram(value){
        return await this.database.queryCommand(`SELECT COUNT(*) AS amount FROM mydb.Students
        WHERE  academicProgram='${value}'`);
    }

}

module.exports = {
    TracingModel : TracingModel
}
    