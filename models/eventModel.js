const Database = require('../infrastructure/ManagerConnection').Connection;
const PATH_CLIENT = 'http://localhost:3000/';
class EvenModel {
    constructor(data, type){
        this.database = new Database();
        this.database.getConection();

        if(data != undefined){
            
                this.eventName =  data.nameEvent;
                this.eventDescription = data.description;
                this.eventDate =  data.date;
                this.eventImage = data.eventImage;
        }
    }

    setEvent(data){

        this.eventName =  data.nameEvent;
        this.eventDescription = data.description;
        this.eventDate =  data.date;
        this.eventImage = data.eventImage;
    }

    async create(){
        console.log(this.eventName);
        const result = await this.database.queryCommand(`INSERT INTO mydb.Events 
        (eventName, eventDescription, eventDate, eventImage) values ("${this.eventName}", "${this.eventDescription}",
         "${this.eventDate}" , "${this.eventImage}")`);
        return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }

    async getLastInsertId(){
        return await this.database.queryCommand(`SELECT idEvents FROM mydb.Events 
            ORDER BY idEvents DESC LIMIT 1 `); 
    }

    async getAllEvents(){
         return await this.database.queryCommand(`SELECT * FROM mydb.Events`);
    }

    async deleteEvent(id){
        const result = await this.database.queryCommand(`DELETE FROM mydb.Events WHERE idEvents = ${id}`);
        console.log(result);
        return result['affectedRows'] == 1 ? 'erased' :  'not-erased';
    }

    async editEvent(id){
        
        const result = await this.database.queryCommand(`UPDATE mydb.Events SET eventName="${this.eventName}",
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

    async createEventStatistics(idEvent){
        const result = await this.database.queryCommand(`INSERT INTO mydb.EventStatistics (numberRegistered, numberAttendees, idEvent) 
            values (${0}, ${0}, ${idEvent})`);
            return result['affectedRows'] == 1 ? 'created' :  'not-created'; 
    }

    async getNumberByEvent(id, type){
        return await this.database.queryCommand(`SELECT ${type == 1 ? 'numberRegistered' : 'numberAttendees'}  FROM mydb.EventStatistics
            WHERE idEvent=${id}`);
    }

    async updateEventStatics(counter, id, type){
       
        const result = await this.database.queryCommand(`UPDATE mydb.EventStatistics
            SET ${type== 1 ? 'numberRegistered': 'numberAttendees'}=${counter}
            WHERE idEvent=${id} `);
           console.log(result);
           return result['changedRows'] == 1 ? 'edited' :  'not-edited';
    }

    async getEventById(idEvent){
        return await this.database.queryCommand(`SELECT eventName, eventDate FROM mydb.Events 
        WHERE idEvents=${idEvent}`);
    }

    async getEventStatistcs(){
        return await this.database.queryCommand(`SELECT * FROM mydb.EventStatistics ORDER BY idEventStatistics DESC LIMIT 3`);
    }

    async updateEventImage(data) {
        const result = await this.database.queryCommand(`UPDATE mydb.Events 
        SET eventImage="${path.path}" WHERE idEvent=${data.id}`);

        return result['changedRows'] == 1 ? 'edited': 'not-edited';
    }

    async getEventStatistcsById(id){
        return await this.database.queryCommand(`SELECT * FROM mydb.EventStatistics
         WHERE idEvent=${id}`);
    }

    closeConectionBD(){
        this.database.closeConnection();
    }
}

module.exports = {
    EvenModel: EvenModel
};