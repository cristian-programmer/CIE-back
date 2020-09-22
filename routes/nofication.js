var express = require("express");
var router = express.Router();

const UserModel = require("./../models/userModel").UserModel;
const user = new UserModel();

const ManagerEmail = require("./../infrastructure/ManagerEmail").ManagerEmail;
const email = new ManagerEmail();

router.post("/email", async (req, res) => {
  console.log(req.body);
  const ids = getInArray(req.body.idGuests, ",");
  for (let i = 0; i < ids.length; i++) {
    const data = await user.getUserById(ids[i]);
    const notification = {
      subject: email.getTypeSubject(req.body.typeSubject),
      text: req.body.message,
      to: data[0].email,
    };

    console.log(notification);
    email.setOptions(notification);
    email.sendEmail();
    //console.log("data ", data);
    res.json({
      result: "success",
    });
  }
});

function getInArray(content, symbol) {
  return content.split(symbol);
}

module.exports = router;
