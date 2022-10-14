const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const { eventGif } = require("./event");

const app = express();
const router = express.Router();

const currentYear = "2022";

router.get("/", (req, res) => {
  // Access the provided 'page' and 'limt' query parameters

  const eventName = req.query.text
    ? req.query.text
    : `Hacktoberfest Open Hack Day Bangkok ${currentYear}`;
  const padString = req.query.padding ? req.query.padding : "0";
  const bgColor = req.query.bgColor ? req.query.bgColor : "#0000ff";
  const startDate = new Date().getTime();
  const eventDate = req.query.on
    ? req.query.on
    : `Oct 30, ${currentYear} 09:00:00`;
  const endDate = new Date(eventDate).getTime();
  res.set("accept-ranges", "bytes;");
  res.set("Content-Disposition", "inline;");
  res.set("transfer-encoding", "");
  res.contentType("image/gif");

  eventGif(res, endDate, eventName, padString, startDate, bgColor);
});
router.post("/", (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use("/.netlify/functions/event-gif", router); // path must route to lambda
app.use("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

module.exports = app;
module.exports.handler = serverless(app);
