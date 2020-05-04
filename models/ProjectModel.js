const Database = require('../infrastructure/ManagerConnection').Connection;
const S3 = require('../infrastructure/ManagerS3File').ManagerS3File;

class ProjectModel {

    constructor(data){

        this.database = new Database();
        this.database.getConection();
        if(data != undefined) {
            this.projectName = data.projectName;
            this.currentAdvisor = data.currentAdvisor;
            this.methodologicalPhases = data.phases;
            this.entrepreneurs = data.entrepreneurs
        }
        
    }

    async getListProject(){
        return await this.database.queryCommand('SELECT projectName, idProject FROM mydb.projects');
    }

    async create(){

        const result = await this.database.queryCommand(`INSERT INTO mydb.projects (projectName, currentAdvisor,
             methodologicalPhases, entrepreneurs ) VALUES("${this.projectName}", "${this.currentAdvisor}",
              "${this.methodologicalPhases}", "${this.entrepreneurs}")`);

         return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }

    async getParticipans(id){
        return await this.database.queryCommand(`SELECT currentAdvisor, entrepreneurs FROM mydb.projects
        WHERE idProject=${id}`);
    }

    validate(){

    }

}

module.exports = {
    ProjectModel : ProjectModel
}