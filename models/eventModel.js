const Database = require('../infrastructure/ManagerConnection').Connection;

class EvenModel {
    constructor(data, type){
        this.database = new Database();
        this.database.getConection();

        if(data != undefined){
            
                this.eventName =  data.nameEvent;
                this.eventDescription = data.description;
                this.eventDate =  data.date;
                this.eventImage = "path/falsy";
        }
    }

    async create(){
        console.log(this.eventName);
        const result = await this.database.queryCommand(`INSERT INTO mydb.events 
        (eventName, eventDescription, eventDate, eventImage) values ("${this.eventName}", "${this.eventDescription}",
         "${this.eventDate}" , "${this.eventImage}")
         `);
        return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }

    async getAllEvents(){
         return await this.database.queryCommand(`SELECT * FROM mydb.events`);
    }

    async deleteEvent(id){
        const result = await this.database.queryCommand(`DELETE FROM mydb.events WHERE idEvents = ${id}`);
        console.log(result);
        return result['affectedRows'] == 1 ? 'erased' :  'not-erased';
    }

    async editEvent(id){
        
        const result = await this.database.queryCommand(`UPDATE mydb.events SET eventName="${this.eventName}",
        eventDescription="${this.eventDescription}", eventDate="${this.eventDate}" WHERE idEvents=${id} `);
        console.log(result);
        return result['changedRows'] == 1 ? 'edited' :  'not-edited';
    }

    async createAttendance(data){
        const result = await this.database.queryCommand(`INSERT INTO mydb.Attendance (fullname, program, semester, 
            relationshipUniversity, company, email, phoneNumber, idEvent) values ("${data.fullname}", 
            "${data.program}", "${data.semester}", "${data.relationship}", "${data.company}",
            "${data.email}", "${data.phoneNumer}", "${data.idEvent}")`);
            return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }

    async createEventStatistics(data){
        const result = await this.database.queryCommand(`INSERT INTO mydb.eventStatistics (numberRegistered, numberAttendees, idEvent) 
            values (${0}, ${0}, ${data.idEvent})`);
            return result['affectedRows'] == 1 ? 'created' :  'not-created'; 
    }

    async getNumberByEvent(id, type){
        return await this.database.queryCommand(`SELECT ${type == 1 ? 'numberRegistered' : 'numberAttendees'}  FROM mydb.eventStatistics
            WHERE idEvent=${id}`);
    }

    async updateEventStatics(counter, id, type){
       
        const result = await this.database.queryCommand(`UPDATE mydb.eventStatistics
            SET ${type== 1 ? 'numberRegistered': 'numberAttendees'}=${counter}
            WHERE idEvent=${id} `);
           console.log(result);
           return result['changedRows'] == 1 ? 'edited' :  'not-edited';
    }

    closeConectionBD(){
        this.database.closeConnection();
    }
}

module.exports = {
    EvenModel: EvenModel
};