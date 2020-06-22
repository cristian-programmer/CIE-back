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
            "${this.username}", "${this.password}", "${this.relationshipUniversity}", "${this.role}")`);

        return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }

    async getUser(username, password){
        return await this.database.queryCommand(`SELECT * from mydb.Users  WHERE
         username = "${username}" and password = "${password}"`);
    }

    async getAllUsers(){
        return await this.database.queryCommand(`SELECT idUsers, name, username, email, role FROM mydb.Users WHERE role != "admin"`);
    }

    async updateRole(data){
        data = {...data};
        const result = await this.database.queryCommand(`UPDATE mydb.Users SET role="${data.role}"
         WHERE idUsers="${data.id}"`);
        return result['changedRows'] == 1 ? 'edited' :  'not-edited';
    }


    async updateProfileImage(data){
        const result = await this.database.queryCommand(`UPDATE mydb.Users SET image='${data.path}'
        WHERE idUsers="${data.id}"`);
        return result['changedRows'] == 1 ? 'edited' : 'not-edited';
    }

    async getUserById(id){
        return await this.database.queryCommand(`SELECT name, email, username, role,
         relationshipUniversity, phone, mobile, image FROM mydb.Users WHERE idUsers=${id}`);
    }

    async editUser(data){
        const result = await this.database.queryCommand(`UPDATE mydb.Users SET name="${data.name}", 
        email="${data.email}", username="${data.username}", phone="${data.phone}", mobile="${data.mobile}" 
        WHERE idUsers=${data.id}`);
        return result['changedRows'] == 1 ? 'edited': 'not-edited';
    }

}

module.exports = {
    UserModel :  UserModel
};