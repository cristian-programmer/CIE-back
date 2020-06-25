const Socket = require('socket.io');
const PORT = 4000;
class SocketServer {

    constructor(){
        this.socket = new Socket(PORT); 
    }

    socketServerOn(){
        console.info('create socket in PORT ', PORT);
        this.socket.on('connection', (socket)=>{
            this.users(socket);
        });
    }

    users(socket){
        socket.on('/users', (id, data)=>{
            console.log("id: ", id, " data: ", data);
        })
    }

}


module.exports = {
    SocketServer: SocketServer
}