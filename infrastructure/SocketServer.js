const Socket = require('socket.io');
const UserModel = require('../models/userModel').UserModel;
const ManagerEmail = require('./ManagerEmail').ManagerEmail;


const PORT = 4000;
class SocketServer {

    constructor(){
        this.socket = new Socket(PORT); 
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

                    const result = await this.userModel.getUserByName(key);
                    console.log(result[0].email);
                    const options = {
                        from: 'Remitente',
                        to: result[0].email,
                        subject: 'Gestion CIE - notificaciones',
                        text: data.message
                    };
                    this.email.sendEmail(options);
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
                    const result = await this.userModel.getUserByName(key);
                    console.log(result[0].email);
                    const options = {
                        from: 'Remitente',
                        to: result[0].email,
                        subject: 'Gestion CIE - notificaciones',
                        text: data.message
                    };
                    this.email.sendEmail(options);
                    this.socket.sockets.connected[value].emit("/notification", response)

                }
            });
            console.log(data);
        });
    }

}


module.exports = {
    SocketServer: SocketServer
}