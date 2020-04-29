const Database = require('../infrastructure/ManagerConnection').Connection;

class UserModel{
    constructor(data, register){
        this.database = new Database();
        this.database.getConection();

        if(data != undefined){
            this.username = data.username;
            this.password = data.password;

            if(register){
                this.role =  this.assignRole(data.relationship);
                this.name = data.fullname;
                this.email = data.email;
                this.relationshipUniversity = data.relationship;
            }
        }

    }

    assignRole(relationship){
        return ( relationship == 'graduate' || 
        relationship == 'entrepreneur' || relationship == 'other') ?
         'entrepreneur' : 'role-pending';
    }

    async create(){
        console.log(this.role);
     const result = await this.database.queryCommand(`INSERT INTO mydb.Users
      (name, email, username, password,  relationshipUniversity, role) values ("${this.name}", "${this.email}", 
            "${this.username}", ${this.password}, "${this.relationshipUniversity}", "${this.role}")`);

        return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }

    async getUser(username, password){
        return await this.database.queryCommand(`SELECT * from mydb.Users  WHERE
         username = "${username}" and password = "${password}"`);
    }

}

module.exports = {
    UserModel :  UserModel
};