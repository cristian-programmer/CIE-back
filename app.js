var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
require("pretty-console-colors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var eventRouter = require("./routes/event");
var serviceRouter = require("./routes/service");
var tracingRouter = require("./routes/tracing");
var projectRouter = require("./routes/project");
var configRouter = require("./routes/config");
var calendar = require("./routes/calendar");

var StructureDB = require("./infrastructure/structureDB").StructureDB;
var SocketServer = require("./infrastructure/SocketServer").SocketServer;

console.info("Init Server PORT ", process.env.PORT);
console.info("Init Server DB_USER ", process.env.DB_USER);
console.info("Init Server DB_PASS ", process.env.DB_PASS);
console.info("Init Server DB_HOST ", process.env.DB_HOST);
console.info("Init Server DB_PORT ", process.env.DB_PORT);
console.info("Init Server TOKEN ", process.env.TOKEN);

const structureDB = new StructureDB();
const sockServer = new SocketServer();
sockServer.socketServerOn();

structureDB.createAll();

var app = express();
dotenv.config();

function cors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, " +
      "X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  // res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/event", eventRouter);
app.use("/service", serviceRouter);
app.use("/tracing", tracingRouter);
app.use("/project", projectRouter);
app.use("/config", configRouter);
app.use("/calendar", calendar);

module.exports = app;
