const NotificationModel = require('./../models/notificationModel').NotificationModel;
const notificationModel = new NotificationModel();

class Notification {

    setNotification(data, to){
        this.notification = {
            to : to,                     
            from : data.from,
            message : data.message,
            link : 'link',
            image: data.image
        };
        console.log("notification >>> ", this.notification);
    }

    async getNotifications(id) {
        return await notificationModel.getNotificationsByIdUsersTo(id);
    }

    async saveNotification() {
        const response = await notificationModel.createNotification(this.notification);
        console.log("save notification >>>> ", response);
    }

    async getAmountNotifications(id){
        return  await notificationModel.getAmountNotifications(id);
    }

    getNotificationInMen(){
        return new Array(this.notification);
    }



}

module.exports = {
    Notification : Notification
};
