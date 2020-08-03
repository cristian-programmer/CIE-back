const { response } = require('express');

const Database = require('../infrastructure/ManagerConnection').Connection;

class ProjectModel {

    constructor(){

        this.database = new Database();
        this.database.getConection();
    }

    setActivity(data){
        this.nameActivity = data.nameActivity;
        this.responsables = data.responsables;
        this.state = data.state;
        this.executionWeek = data.week;
        this.phase = data.phase;
        this.id = data.id;
        this.description = data.description;
        this.resources = data.resources;
    }

    setProject(data){
        this.projectName = data.nameProyect;
        this.currentAdvisor = data.nameAsesor;
        this.previusAdvisers = data.tagsAdvisers;
        this.methodologicalPhases = data.tagsmethodologies;
        this.entrepreneurs = data.Entre;

    }



    async getAllEntre(){         
        return await this.database.queryCommand(`SELECT * FROM mydb.Users 
        WHERE role="entrepreneur"`);    
     }

    async getAllProjects(){
        return await this.database.queryCommand(`SELECT * FROM mydb.Projects`)   
    }


    async getListProject(nameAsesor){ 
        return await this.database.queryCommand(`SELECT * FROM mydb.Projects where currentAdvisor= "${nameAsesor}"`);
    }
  
     async getPorjectsByCurrentAvisor(name){
        return await this.database.queryCommand(`SELECT * FROM mydb.Projects WHERE 
            currentAdvisor="${name}"`);
    }

    async create(){

        const result = await this.database.queryCommand(`INSERT INTO mydb.Projects (projectName, currentAdvisor, 
            previusAdvisers, methodologicalPhases, entrepreneurs ) VALUES("${this.projectName}", "${this.currentAdvisor}", 
            "${this.previusAdvisers}", "${this.methodologicalPhases}", "${this.entrepreneurs}")`);
        
            console.log(`INSERT INTO mydb.Projects (projectName, currentAdvisor, 
            previusAdvisers, methodologicalPhases, entrepreneurs ) VALUES("${this.projectName}", "${this.currentAdvisor}", 
            "${this.previusAdvisers}", "${this.methodologicalPhases}", "${this.entrepreneurs}")`)
         return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }

    async getParticipans(id){
        return await this.database.queryCommand(`SELECT currentAdvisor, entrepreneurs FROM mydb.Projects
        WHERE idProject=${id}`);
    }

    async deleteProject(id){
        const result = await this.database.queryCommand(`DELETE FROM mydb.Projects WHERE idProject = ${id}`);
        console.log(result);
        return result['affectedRows'] == 1 ? 'erased' :  'not-erased';
    }

    async editProject(id){
        console.log("projectooo", this.projectName);
        
        const result = await this.database.queryCommand(`UPDATE mydb.Projects SET projectName="${this.projectName}",
        currentAdvisor="${this.currentAdvisor}", previusAdvisers="${this.previusAdvisers}", methodologicalPhases="${this.methodologicalPhases}",
        entrepreneurs="${this.entrepreneurs}" WHERE idProject=${id} `);
        console.log(result);
        return result['changedRows'] == 1 ? 'edited' :  'not-edited';
    }

    async getProjectById(id){
        return await this.database.queryCommand(`SELECT * FROM mydb.Projects WHERE idProject=${id}`);
    }

    async getActiviesByProject(id, phase){
        console.log(id, " ", phase);
        return await this.database.queryCommand(`SELECT * FROM mydb.Activities WHERE 
        idProject=${id} and phase="${phase}"`);

    }

    async createActivityByProject(){
        const result =  await this.database.queryCommand(`INSERT INTO mydb.Activities 
        (nameActivity, responsables, state, executionWeek, phase, idProject, description, resources) values ("${this.nameActivity}",
       "${this.responsables}", "${this.state}", "${this.executionWeek}", "${this.phase}", ${this.id}, "${this.description}", "${this.resources}")`);

        return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }


    setResource(resource){
        this.resources = resource;
    }

    async getAllParticipants(){
        return await this.database.queryCommand(`SELECT entrepreneurs, currentAdvisor, projectName FROM mydb.Projects`)
    }

    async getActivitiesByPhase(phase){
       return await this.database.queryCommand(`SELECT * from mydb.Activities WHERE phase="${phase}"`);
    }

    async createCommentary(data) {
        const result = await this.database.queryCommand(`INSERT INTO mydb.Comments (idUsers, commentary, idActivity) 
        values ("${data.idUsers}", "${data.commentary}", ${data.idActivity})`);
        return result['changedRows'] == 1 ?  'edited' : 'not-edited'; 
    }

    async getCommentsByIdActivity(id) {
        return await this.database.queryCommand(`SELECT COUNT(*) AS amount FROM mydb.Comments
         WHERE idActivity=${id}`);
    }

    async createAssignment(data){
        const result = await this.database.queryCommand(`INSERT INTO mydb.Methodology (idProject, phaseName, idAdviser)
        values (${data.idProject}, "${data.phase}", ${data.idAssigned})`);

        return result['affectedRows'] == 1 ? 'created' : 'not-created';
    }

    async getAssignment(id, phase){
        return await this.database.queryCommand(`SELECT * FROM mydb.Methodology WHERE idProject=${id} AND phaseName="${phase}"`);
    }

    async updateAssignment(data) {
        const result = await this.database.queryCommand(`UPDATE mydb.Methodology 
        SET idProject=${data.idProject}, phaseName="${data.phase}", idAdviser=${data.idAssigned} WHERE idProject=${data.idProject}`);
        return result['changedRows'] == 1 ? 'edited' : 'not-edited';
    }

    async getAssignmentByAll(data) {
        return await this.database.queryCommand(`SELECT * FROM mydb.Methodology WHERE idProject=${data.idProject} 
        AND phaseName="${data.phase}"`);
    }

    async getActivitiesByIdProject(phase, id){
        return await this.database.queryCommand(`SELECT COUNT(*) AS amount FROM mydb.Activities 
        WHERE idProject=${id} AND phase="${phase}"`);
    }

    async getIdActivities(phase, id){
        return await this.database.queryCommand(`SELECT idActivities FROM mydb.Activities 
        WHERE idProject=${id} AND phase="${phase}"`);
    }

    async getCommentsIdUsers(id) {
        return await this.database.queryCommand(`SELECT * FROM mydb.Comments
         WHERE idActivity=${id}`);
    }

    async getActivityById(id) {
        return await this.database.queryCommand(`SELECT * FROM mydb.Activities WHERE idActivities=${id}`);
    }

    async getAllActivitiesByIdProject(id) {
        return await this.database.queryCommand(`SELECT * FROM mydb.Activities WHERE idProject=${id}`)
    }

    async updateRateActivity(data){
        const result = await this.database.queryCommand(`UPDATE mydb.Activities SET rate=${data.rate}
         WHERE idActivities=${data.id}`);

         return result['changedRows'] == 1 ? 'edited' : 'not-edited';
    }

    async getPhases(id) {
        return await this.database.queryCommand(`SELECT methodologicalPhases FROM mydb.Projects
         WHERE idProject=${id}`)
    }

    async updatePercentaje(data){
        const result = await this.database.queryCommand(`UPDATE mydb.Activities SET percentaje=${data.percentaje}
        WHERE idActivities=${data.id}`)

        return result['changedRows'] == 1 ? 'edited' : 'not-edited';
    }

    async updateState(data){
        const result = await this.database.queryCommand(`UPDATE mydb.Activities SET state="${data.state}"
        WHERE idActivities=${data.id}`);

        return result['changedRows'] == 1 ? 'edited' : 'not-edited';
    }

    async deleteActivity(id){
        const result = await this.database.queryCommand(`DELETE FROM mydb.Activities WHERE idActivities = ${id}`);
        console.log(result);
        return result['affectedRows'] == 1 ? 'erased' :  'not-erased';
    }


}

module.exports = {
    ProjectModel : ProjectModel
}