const ManagerConnection = require('./../infrastructure/ManagerConnection').Connection;


class NotificationModel {
    constructor () {
        this.database = new ManagerConnection();
        this.database.getConection();
    }

    async createNotification(data){
        const result = await this.database.queryCommand(`INSERT INTO mydb.Notifications (idUsersTo, message, userFrom, image, link)
        values (${data.to}, "${data.message}", "${data.from}" , "${data.image}" , "link")`);
        return result['affectedRows'] == 1 ? 'created' : 'not-create';
    }

    async getNotificationsByIdUsersTo(myId) {
        return await this.database.queryCommand(`SELECT * FROM mydb.Notifications WHERE idUsersTo=${myId}`);
    }

    async getAmountNotifications(myId){
        return await this.database.queryCommand(`SELECT COUNT(*) as amount FROM mydb.Notifications
         WHERE idUsersTo=${myId}`);
    }
}


module.exports = {
    NotificationModel: NotificationModel
}