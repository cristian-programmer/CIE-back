const Socket = require('socket.io');
const UserModel = require('../models/userModel').UserModel;



const PORT = 4000;
class SocketServer {

    constructor(){
        this.socket = new Socket(PORT); 
        this.userModel = new UserModel();
        this.usersActives = new Map();
        this.usersActives.set();
    }

    socketServerOn(){
        console.info('create socket in PORT ', PORT);
        this.socket.on('connection', (socket)=>{
            this.registerUser(socket);
            this.inviteProject(socket);
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
            let notifi = []; 

            console.log(names);
            this.usersActives.forEach((value, key) =>{
                console.log(` value ${value} key ${key}`);
                if(names.includes(key)){
                    console.info('include', key);
                    const response = new Array({
                        from: data.from,
                        image: data.image,
                        message: data.message
                    });
                    this.socket.sockets.connected[value].emit("/notification", response)
                }
            });
            socket.emit('/invited', '<ok>');
        });
    }

}


module.exports = {
    SocketServer: SocketServer
}