const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);

  var database = database.db("note-api");
  require("./app/routes")(app, database);

  app.listen(port, () => {
    console.log("Live on " + port);
  });
});
