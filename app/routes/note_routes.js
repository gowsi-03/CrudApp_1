var ObjectID = require("mongodb").ObjectID;
module.exports = (app, db) => {
  app.post("/notes", (req, res) => {
    var note = { text: req.body.body, title: req.body.title };
    db.collection("notes").insertOne(note, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(result);
      }
    });
  });

  //find
  app.get("/notes/:id", (req, res) => {
    const id = req.params.id;
    var details = { _id: new ObjectID(id) };
    db.collection("notes").findOne(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(item);
      }
    });
  });

  //delete
  app.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    var details = { _id: new ObjectID(id) };
    db.collection("notes").remove(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        //res.send(item);
        res.send(`Note ${id} deleted!`);
      }
    });

    //update
    app.put("/notes/:id", (req, res) => {
      const id = req.params.id;
      var details = { _id: new ObjectID(id) };
      var note = { $set: { text: req.body.body, title: req.body.title } };
      db.collection("notes").updateOne(details, note, (err, result) => {
        if (err) {
          res.send({ error: "An error has occurred" });
        } else {
          res.send(note);
        }
      });
    });
  });
};
