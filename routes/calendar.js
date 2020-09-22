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
  const idRes = req.query.user;
  const response = await calendar.getCalendar();
  let meeting = [];

  for (let i = 0; i < response.length; i++) {
    const responsable = await userController.getUserNameById(response[i].idRes);
    const guests = await userController.getUserNameById(response[i].idGuests);
    if (idRes == response[i].idRes || isGuest(response[i].idGuests, idRes)) {
      meeting.push({
        idcalendar: response[i].idcalendar,
        type: response[i].type,
        title: response[i].title,
        purpose: response[i].purpose,
        date: response[i].date,
        responsable,
        guests,
      });
    }
  }

  function isGuest(list, id) {
    return list.split(",").includes(id.toString());
  }

  res.json({
    result: meeting,
  });
});

router.delete("/metting", async (req, res) => {
  console.log("delete meeting", req.query);
  const response = await calendar.deleteMeeting(req.query.id);
  console.log("delete ", response);
  res.json({
    result: response,
  });
});

module.exports = router;
