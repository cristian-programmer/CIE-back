const { response } = require('express');

const Database = require('../infrastructure/ManagerConnection').Connection;
//const S3 = require('../infrastructure/ManagerS3File').ManagerS3File;

class ProjectModel {

    constructor(data, type){

        this.database = new Database();
        this.database.getConection();
        //console.log("dataaaaaa",   data, " ", type);
        if(data != undefined) {
            if(type == 'project') {
                
                this.projectName = data.nameProyect;
                this.currentAdvisor = data.nameAsesor;
                this.previusAdvisers = data.tagsAdvisers;
                this.methodologicalPhases = data.tagsmethodologies;
                this.entrepreneurs = data.value;

            }else if (type == 'activity'){
                console.log("data", data);
                this.nameActivity = data.nameActivity;
                this.responsables = data.responsables;
                this.state = data.state;
                this.executionWeek = data.week;
                this.phase = data.phase;
                this.id = data.id;
            }
        }
    }
    async getAllEntre(){         
        return await this.database.queryCommand(`SELECT * FROM mydb.users 
        WHERE role="entrepreneur"`);    
     }

    async getAllProjects(){
        return await this.database.queryCommand(`SELECT * FROM mydb.projects`)   
    }


    async getListProject(){
        console.log("ooooo", this.currentAdvisor);
        
        return await this.database.queryCommand(`SELECT * FROM mydb.projects where currentAdvisor= "${this.currentAdvisor}"`);
    }
  
     async getPorjectsByCurrentAvisor(name){
        return await this.database.queryCommand(`SELECT * FROM mydb.projects WHERE 
            currentAdvisor="${name}"`);
    }

    async create(){

        const result = await this.database.queryCommand(`INSERT INTO mydb.projects (projectName, currentAdvisor, 
            previusAdvisers, methodologicalPhases, entrepreneurs ) VALUES("${this.projectName}", "${this.currentAdvisor}", 
            "${this.previusAdvisers}", "${this.methodologicalPhases}", "${this.entrepreneurs}")`);

         return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }

    async getParticipans(id){
        return await this.database.queryCommand(`SELECT currentAdvisor, entrepreneurs FROM mydb.projects
        WHERE idProject=${id}`);
    }

    async deleteProject(id){
        const result = await this.database.queryCommand(`DELETE FROM mydb.projects WHERE idProject = ${id}`);
        console.log(result);
        return result['affectedRows'] == 1 ? 'erased' :  'not-erased';
    }

    async editProject(id){
        console.log("projectooo", this.projectName);
        
        const result = await this.database.queryCommand(`UPDATE mydb.projects SET projectName="${this.projectName}",
        currentAdvisor="${this.currentAdvisor}", previusAdvisers="${this.previusAdvisers}", methodologicalPhases="${this.methodologicalPhases}",
        entrepreneurs="${this.entrepreneurs}" WHERE idProject=${id} `);
        console.log(result);
        return result['changedRows'] == 1 ? 'edited' :  'not-edited';
    }

    async getProjectById(id){
        return await this.database.queryCommand(`SELECT * FROM mydb.projects WHERE idProject=${id}`);
    }

    async getActiviesByProject(id, phase){
        console.log(id, " ", phase);
        return await this.database.queryCommand(`SELECT * FROM mydb.activities WHERE 
        idProject=${id} and phase="${phase}"`);

    }

    async createActivityByProject(){
        const result =  await this.database.queryCommand(`INSERT INTO mydb.activities 
        (nameActivity, responsables, state, executionWeek, phase, idProject) values ("${this.nameActivity}",
       "${this.responsables}", "${this.state}", "${this.executionWeek}", "${this.phase}", ${this.id})`);

        return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }


    createResource(){

    }

    async getAllParticipants(){
        return await this.database.queryCommand(`SELECT entrepreneurs, currentAdvisor, projectName FROM mydb.projects`)
    }

    async getActivitiesByPhase(phase){
       return await this.database.queryCommand(`SELECT * from mydb.activities WHERE phase="${phase}"`);
    }

    async createCommentary(data) {
        const result = await this.database.queryCommand(`INSERT INTO mydb.comments (idUsers, commentary, idActivity) 
        values ("${data.idUsers}", "${data.commentary}", ${data.idActivity})`);
        return result['changedRows'] == 1 ?  'edited' : 'not-edited'; 
    }

    async getCommentsByIdActivity(id) {
        return await this.database.queryCommand(`SELECT * FROM mydb.comments WHERE idActivity=${id}`);
    }



}

module.exports = {
    ProjectModel : ProjectModel
}