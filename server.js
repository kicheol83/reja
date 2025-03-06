const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString =
  "mongodb+srv://MIT25_NED:usmonov83%24@cluster0.c6hiw.mongodb.net/Reja?retryWrites=true&w=majority";

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("ERROR or connection MongoDB");
    else {
      console.log("MongoDB connection succed");
      module.exports = client;
      const app = require("./app");
      const server = http.createServer(app);
      let PORT = 5012;
      server.listen(PORT, function () {
        console.log(
          `The sever ins running succesfful on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
