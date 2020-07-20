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

    async createConfigFacebook(data) {
        const result = await this.database.queryCommand(`INSERT INTO mydb.SocialNetwork 
        (accessToken, idPage, emailPage) values ("${data.accessToken}", "${data.idPage}", "${data.emailPage}")`);
        return result['affectedRows'] == 1 ? 'created' : 'not-created';

    }

    async updateConfigFacebook(data){
        const result = await this.database.queryCommand(`UPDATE mydb.SocialNetwork SET accessToken="${data.accessToken}", 
         idPage="${data.idPage}", emailPage="${data.emailPage}" WHERE idSocial=${data.id}`)
        
         return result['changedRows'] == 1 ? 'edited' : 'not-edited';
    }

    async createConfigEmail(data) {
        const result = await this.database.queryCommand(`INSERT INTO mydb.Configurations
         (emailNotification, emailServer) values ("${data.emailNotification}", "${data.emailServer}")`);

         return result['affectedRows'] == 1 ? 'created' : 'not-created';
    }

    async updateConfigEmail(data) {

        const result = await this.database.queryCommand(`UPDATE mydb.Configurations 
        SET emailNotification="${data.emailNotification}", emailServer="${data.emailServer}"
         WHERE idConfigurations=${data.id}`);
        return result['changedRows'] == 1 ? 'edited' : 'not-edited';
    }

    async getConfigFacebook() {
        return await this.database.queryCommand(`SELECT * FROM mydb.SocialNetwork`);

    }

    async getConfigEmail() {
        return await this.database.queryCommand(`SELECT * FROM mydb.Configurations`);
    }

    async deleteUser(id) {
        const result = await this.database.queryCommand(`DELETE FROM mydb.Users
         WHERE idUsers=${id}`);

         return result['affectedRows'] == 1 ? 'erased' : 'not-erased';
    }

}


module.exports = {
    Configuration: Configuration
}