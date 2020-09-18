const ManagerDatabase = require("./../infrastructure/ManagerConnection")
  .Connection;

class CalendarModel {
  constructor() {
    this.database = new ManagerDatabase();
    this.database.getConection();
  }

  async createMetting(data) {
    const result = await this.database.queryCommand(
      `INSERT INTO mydb.Calendar (type, title, purpose, date, hour, idRes, idGuests) values
      (${1}, "${data.title}", "${data.purpose}", "${data.date}", "${
        data.hour
      }", ${data.idRes}, "${data.idGuests}")`
    );

    return result["affectedRows"] == 1 ? "created" : "not-created";
  }

  async getCalendar() {
    return await this.database.queryCommand(`SELECT * FROM mydb.Calendar`);
  }
}

module.exports = {
  CalendarModel,
};
