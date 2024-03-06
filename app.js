const express = require("express");
const loginRoute = require("./Route/loginRoute");
const childRoute = require("./Route/childRoute");
const classRoute = require("./Route/classRoute");
const teacherRoute = require("./Route/teacherRoute");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const authMW = require("./core/auth/authenticationMW");
const multer = require("multer"); // parse to  images
// create server
const server = express();

//listen to port number
const port = process.env.PORT || 8080;

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/NurseryDB")
  .then(() => {
    console.log("BataBase Connection Success");
    server.listen(port, () =>
      console.log(`listening on http://localhost:${port}`)
    );
  })
  .catch((error) => {
    console.log("Connection Error: " + error);
  });

server.use(cors());
server.use(logger("dev"));
//settings
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
//routes
server.use(loginRoute);
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);
server.use(authMW);

//not found
server.use((request, response) => {
  console.log("not found middleware");
  response.statusCode(404).json({ message: "not found" });
});
//error 4 input
server.use((error, request, response, next) => {
  console.log("error middleware");
  response.statusCode(500).json({ message: error + " " });
});

