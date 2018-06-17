const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const apiRoute = require('./route');

// cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// static
app.use(express.static(path.resolve(__dirname, '../dist')));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route
app.use("/api", apiRoute);


const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0");
console.log("sever is listening on http://localhost:" + port);
