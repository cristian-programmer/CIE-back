const Socket = require('socket.io');
const UserModel = require('../models/userModel').UserModel;
const ManagerEmail = require('./ManagerEmail').ManagerEmail;
const Notification = require('./Notification').Notification;

const PORT = 4000;
class SocketServer {

    constructor(){
        this.socket = new Socket(PORT);
        this.socket.set('origins', 'http://localhost:3000'); 
        this.userModel = new UserModel();
        this.usersActives = new Map();
        this.email = new ManagerEmail();
        this.notification = new Notification();
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
            this.getNotifications(socket);
            this.getAmountNotifications(socket);
            this.deleteActivity(socket);
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

                    const user = await this.getDataUserTo(key);
                    this.notification.setNotification(data, user.id);
                    this.notification.saveNotification();

                    await this.sendEmail(data, key);
                    this.socket.sockets.connected[value].emit("/notification", 
                    this.notification.getNotificationInMen());
                    this.sendAmountNotifications(value, user.id);
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

                    const user = await this.getDataUserTo(key);
                    this.notification.setNotification(data, user.id);
                    this.notification.saveNotification();

                    await this.sendEmail(data, key);
                   
                    this.socket.sockets.connected[value].emit("/notification",
                    this.notification.getNotificationInMen())
                    this.sendAmountNotifications(value, user.id);

                }
            });
            console.log(data);
        });
    }

    getNotifications(socket){
        socket.on('/get/notifications', async (data) => {
            console.log("my id >>>> ", data.id);
            const result = await this.notification.getNotifications(data.id);
            console.log(result);
            socket.emit('/notifications', result);
        });
    }

    async getAmountNotifications(socket){
        socket.on('/amountNotifications', async (data) =>{
            const result = await this.notification.getAmountNotifications(data.id);
            console.log("amount >>>> ", result);
            socket.emit('/get/amountNotifications', result)
        }); 
    }

    async sendAmountNotifications(value, id){
        const result = await this.notification.getAmountNotifications(id);
        console.log("send in mem >>>> ", result);
        this.socket.sockets.connected[value].emit('/get/amountNotifications', result);
    }

    deleteActivity(socket){
        socket.on('/deleteActivity',  (data) =>{
            console.log('delete activity >>>>', data);
            const names = data.to; 
            this.usersActives.forEach( async (value, key) => {
                if(names.includes(key)){
                    const user = await this.getDataUserTo(key);
                    this.notification.setNotification(data, user.id);
                    this.notification.saveNotification();
                
                    this.socket.sockets.connected[value].emit("/notification", 
                    this.notification.getNotificationInMen());
                    this.sendAmountNotifications(value, user.id);
                }
            });

        })
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
        const toEmail = await (await this.getDataUserTo(key)).email;
        console.log("to" , toEmail);
        const options = {
            to: toEmail,
            content: data.message
        };
        this.email.setOptions(options);
        this.email.sendEmail();
    }

    async getDataUserTo(key){
        const result = await this.userModel.getUserByName(key);
        return {email : result[0].email, id: result[0].idUsers};
    }
}


module.exports = {
    SocketServer: SocketServer
}