console.log("Web Serverni boshlash");
const express = require("express");
const app = express();
const http = require("http");

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
  console.log(req);

  res.json({ test: "succes" });
});

app.get("/author", (req, res) => {
  res.render("author", { user: user });
});
  
app.get("/", function (req, res) {
  res.render("reja"); 
});

const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function () {
  console.log(`The sever ins running succesfful on port: ${PORT}, http://localhost:${PORT}`);
});
