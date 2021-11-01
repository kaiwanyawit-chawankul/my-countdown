"use strict";
const express = require("express");
const path = require("path");
const { eventGif } = require("../express/event");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  // Access the provided 'page' and 'limt' query parameters

  const eventName = req.query.text
    ? req.query.text
    : "Hacktoberfest Open Hack Day Bangkok 2021";
  const padString = req.query.padding ? req.query.padding : "0";
  const startDate = new Date().getTime();
  const eventDate = req.query.on ? req.query.on : "Oct 30, 2021 09:00:00";
  const endDate = new Date(eventDate).getTime();
  //res.set('Content-Type', 'text/plain');
  //res.set('Content-type', 'img/gif');
  res.set("accept-ranges", "bytes;");
  res.set("Content-Disposition", "inline;");
  res.set("transfer-encoding", "");
  res.contentType("image/gif");

  eventGif(res, endDate, eventName, padString, startDate);
});

app.use("/", router); // path must route to lambda

module.exports = app;

