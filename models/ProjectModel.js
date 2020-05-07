const Database = require('../infrastructure/ManagerConnection').Connection;
//const S3 = require('../infrastructure/ManagerS3File').ManagerS3File;

class ProjectModel {

    constructor(data){

        this.database = new Database();
        this.database.getConection();
        if(data != undefined) {
            this.projectName = data.nameProyect;
            this.currentAdvisor = data.nameAsesor;
            this.previusAdvisers = data.tagsAdvisers;
            this.methodologicalPhases = data.methodologicalPhases;
            this.entrepreneurs = data.tagsEntrepreneurs;
        }
        
    }

    async getListProject(){
        return await this.database.queryCommand('SELECT * FROM mydb.projects');
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
    validate(){

    }

}

module.exports = {
    ProjectModel : ProjectModel
}