const Database = require('../infrastructure/ManagerConnection').Connection;

class UserModel{
    constructor(){
        this.database = new Database();
        this.database.getConection();

    }

    setUser(data, register){
        this.username = data.username;
        this.password = data.password;
        const role = data.role ? data.role : data.relationship;
        if(register){
            this.role =  this.assignRole(role);
            this.name = data.fullname;
            this.email = data.email;
            this.relationshipUniversity = data.relationship;
        }
    }

    assignRole(relationship){
        return ( relationship == 'graduate' || 
        relationship == 'student' || relationship == 'external') ?
         'entrepreneur' : relationship;
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

    
    async getAllUsersByRole () {
        return await this.database.queryCommand(`SELECT * FROM mydb.Users WHERE role="adviser"`);
    }

    async getUserByName(name) {
        return await this.database.queryCommand(`SELECT * FROM mydb.Users WHERE name="${name}"`);
    }

    async createAdviser(data){
        const result = await this.database.queryCommand(`INSERT INTO mydb.Advisers (idUsersAd, universityDegrees, experience)
        values (${data.idUsersAd}, "${data.universityDegrees}", ${data.experience})`);
        
        return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }

    async getDatatAdviser(id){
        return await this.database.queryCommand(`SELECT * FROM mydb.Advisers WHERE idUsersAd=${id}`);
    }


}

module.exports = {
    UserModel :  UserModel
};