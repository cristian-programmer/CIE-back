let express = require("express");
let router = express.Router();

const CalendarModel = require("./../models/calendarModel").CalendarModel;
const calendar = new CalendarModel();

const userController = require("./../controllers/userController");

router.post("/metting", async (req, res) => {
  const response = await calendar.createMetting(req.body);
  res.json({
    result: response,
  });
});

router.get("/metting", async (req, res) => {
  console.log("/metting ", req.query);
  const response = await calendar.getCalendar(req.query);
  let meeting = [];

  for (let i = 0; i < response.length; i++) {
    console.log(response[i]);
    const responsable = await userController.getUserNameById(response[i].idRes);
    const guests = await userController.getUserNameById(response[i].idGuests);

    meeting.push({
      idcalendar: response[i].idcalendar,
      type: response[i].type,
      title: response[i].title,
      purpose: response[i].purpose,
      date: response[i].date,
      responsable,
      guests,
    });

    console.log("res: ", responsable, " ", guests);
  }

  res.json({
    result: meeting,
  });
});

module.exports = router;
