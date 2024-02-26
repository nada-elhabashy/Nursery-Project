const express = require("express");
const loginRoute = require("./Routes/loginRoute");
const childRoute = require("./Route/childRoute");
const classRoute = require("./Route/classRoute");
const teacherRoute = require("./Route/teacherRoute");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const authMW = require("./Core/auth/authenticationMiddleWare");
const multer = require("multer");// parse to  images
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
server.use(childsRoute);
server.use(classesRoute);
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(path.join(__dirname, "images"));
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    console.log(
      new Date().toLocaleDateString().replace("///g", "-") +
        "-" +
        file.originalname
    );
    cb(
      null,
      new Date().toLocaleDateString().replace(/\//g, "-") +
        "-" +
        file.originalname
    );
  },
});
const filterFile = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};



server.use("/images", express.static(path.join(__dirname, "images")));
server.use(multer({ storage, filterFile }).single("Image"));