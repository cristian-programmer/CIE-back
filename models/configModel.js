const Database = require('../infrastructure/ManagerConnection').Connection;

class Configuration {

    constructor(data){
        this.database = new Database();
        this.database.getConection();
        
        if(data != undefined) {
            this.nameModule =  data.nameModule;
            this.role = data.role;
            this.route = data.route;
            this.active = data.active;
        }
    }

    async getSystemModules(){
        return await this.database.queryCommand("SELECT * FROM mydb.SystemModules")
    }

    async createModules(){
        const result = await this.database.queryCommand(`INSERT INTO mydb.SystemModules (nameModule, role, route, active)
         values ("${this.nameModule}", "${this.role}", "${this.route}", ${this.active})`);
        console.log(result);
         return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }

    async updateVisible(data){
        console.log(data);
        const result = await this.database.queryCommand(`UPDATE mydb.SystemModules SET active=${data.visible}
         WHERE idSystemModules=${data.id} `);
        console.log(result);
        return result['changedRows'] == 1 ? 'edited' :  'not-edited';
    }

    async getModulesByRole(data){
        return await this.database.queryCommand(`SELECT * FROM mydb.SystemModules WHERE role="${data}"`);
    }

}


module.exports = {
    Configuration: Configuration
}