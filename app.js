console.log("Web Serverni boshlash");
const express = require("express");
const app = express();
// const http = require("http");

// MongoDB chaqirsh
const db = require("./server").db();
const mongodb = require("mongodb");

// 1 => Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const fs = require("fs");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
  if (err) {
    console.log("ERROR:", err);
  } else {
    user = JSON.parse(data);
  }
});

// 2: Session

// 3 => BCCR => Views code
app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing code
app.post("/create-item", (req, res) => {
  console.log("user entered /create-item");
  console.log("STEP-3: FRONTENDDAN => BACKENDGA KELDIM");
  console.log(req.body);

  const new_reja = req.body.reja;

  console.log("STEP-4: BACKEND > DBga CREATE uchun keldim...");
  db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    console.log("STEP4: DB => BACKENDGA qaytdim");
    console.log(data.ops[0]);

    console.log("STEP-6: BACKEND => FRONTENDga javob berish...");
    res.json(data.ops[0]);
  });
});

// app.get("/author", (req, res) => {
//   res.render("author", { user: user });
// });
app.post("/delete-item", (req, res) => {
  console.log("STEP-3: FRONTENDdan => BACKENDga keldim..");

  console.log(req.body);
  const id = req.body.id;

  console.log("STEP-4: BACKENDdan => DBga delete uchun keldim..");
  db.collection("plans").deleteOne(
    { _id: new mongodb.ObjectId(id) },
    function (err, data) {
      console.log("STEP-5: DB => BACKENDGA QAYTDIM");
      console.log(id);

      console.log("STEP-6: BACKENDdan => FRONTENDga javob berish...");
      res.json({ state: "success" });
    }
  );
});

app.post("/edit-item", (req, res) => {
  const data = req.body;
  console.log(data);
  db.collection("plans").findOneAndUpdate(
    { _id: new mongodb.ObjectId(data.id) },

    { $set: { reja: data.new_input } },
    function (err, data) {
      res.json({ state: "success" });
    }
  );
});

app.post("/delete-all", (req, res) => {
  if (req.body.delete_all) {
    db.collection("plans").deleteMany(function () {
      res.json({ state: "hamma rejalar ochirildi" });
    });
  }
});

app.get("/", function (req, res) {
  console.log("user entered /");
  console.log("STEP2: Backendga kirish");

  console.log("STEP3: Backendan => Databasega bormoqdamiz");
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      console.log("STEP4: Databsedan => Backenga kirish");
      console.log("data:", data);

      console.log("STEP5: Source qurib databsega yubormoqdamiz");
      res.render("reja", { items: data });
    });
});

// const server = http.createServer(app);
// let PORT = 3000;
// server.listen(PORT, function () {
//   console.log(`The sever ins running succesfful on port: ${PORT}, http://localhost:${PORT}`);
// });

module.exports = app;
