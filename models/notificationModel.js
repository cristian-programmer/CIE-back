const ManagerConnection = require('./../infrastructure/ManagerConnection').Connection;


class NotificationModel {
    constructor () {
        this.database = new ManagerConnection();
        this.database.getConection();
    }

    createNotification(data){
        const result = this.database.queryCommand(`INSERT INTO mydb.Notifications (idUsersTo, message, idUsersFrom, link)
        values (${data.idUsersTo}, "${data.message}", ${idUsersFrom}, "link")`);
        return result['affectedRows'] == 1 ? 'created' : 'not-create';
    }

    getNotificationsByIdUsersTo() {
        return this.database.queryCommand(`SELECT * FROM mydb.Notifications WHERE`)
    }
}


module.exports = {
    NotificationModel: NotificationModel
}