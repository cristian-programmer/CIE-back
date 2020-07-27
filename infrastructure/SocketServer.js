const Socket = require('socket.io');
const UserModel = require('../models/userModel').UserModel;
const ManagerEmail = require('./ManagerEmail').ManagerEmail;


const PORT = 4000;
class SocketServer {

    constructor(){
        this.socket = new Socket(PORT);
        this.socket.set('origins', 'http://localhost:3000'); 
        this.userModel = new UserModel();
        this.usersActives = new Map();
        this.email = new ManagerEmail();
    }

    socketServerOn(){
        console.info('create socket in PORT ', PORT);
        this.socket.on('connection', (socket)=>{
            this.registerUser(socket);
            this.inviteProject(socket);
            this.createActivity(socket);
            socket.on('/test', (data) => {
                console.log("test", data );
            });
            this.disconnectSocket(socket);
        });
    }

    registerUser(socket){
        socket.on('/registerUser', (data)=>{
            console.log("id: ", data, " data: ", socket.id);
            this.usersActives.set(data.username, socket.id);
            this.socket.sockets.connected[socket.id].emit("/id", "ok");
        });
    }

    inviteProject(socket){
        socket.on('/invite', (data) => {
            console.info(` invite >>>>${data.to}`);
            const names = (data.to).toString().split(',');
            
            console.log(names);
            this.usersActives.forEach( async (value, key)  =>{
                console.log(` value ${value} key ${key}`);
                if(names.includes(key)){
                    console.info('include', key);
                    const response = new Array({
                        from: data.from,
                        image: data.image,
                        message: data.message
                    });

                    await this.sendEmail(data, key);
                    this.socket.sockets.connected[value].emit("/notification", response)
                }
            });
        });
    }

    createActivity(socket) {
        socket.on('/createActivity', (data) => {
           const names = (data.to).toString();
            this.usersActives.forEach (async (value, key) =>{
                console.log(` value ${value} key ${key}`);
                if(names.includes(key)){
                    console.info('include', key);
                    const response = new Array({
                        from: data.from,
                        image: data.image,
                        message: data.message
                    });
                    await this.sendEmail(data, key);
                    this.socket.sockets.connected[value].emit("/notification", response)

                }
            });
            console.log(data);
        });
    }

    disconnectSocket(socket) {
        socket.on('disconnect', () => {
            console.log("disconnect >>>> " , socket.id);
            this.usersActives.forEach((value, key) => {
                console.log("users  >>>> " , this.usersActives);
                if(value == socket.id) {
                    console.log("equals");
                    this.usersActives.delete(key);

                }
            });
        });
    }



    async sendEmail(data, key) {

        console.log("data ", data, " key ", key);
        const toEmail = await this.getEmail(key);
        console.log("to" , toEmail);
        const options = {
            to: toEmail,
            content: data.message
        };
        this.email.setOptions(options);
        this.email.sendEmail();
    }

    async getEmail(key){
        const result = await this.userModel.getUserByName(key);
        return result[0].email;
    }

}


module.exports = {
    SocketServer: SocketServer
}