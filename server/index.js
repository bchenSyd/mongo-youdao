const path = require("path");
const express = require("express");
const history = require('connect-history-api-fallback');
const bodyParser = require("body-parser");
const app = express();
const chalk = require("chalk");
const apiRoute = require("./route");
const { connect: connectDb, close: closeDb } = require("./db");
// cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// static
app.use(history());
app.use(express.static(path.resolve(__dirname, "../dist")));


// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route
app.use("/api", apiRoute);

const port = process.env.PORT || 8080;
const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, "0.0.0.0");
    console.log(chalk.green(`sever is listening on http://localhost:${port}`));
  } catch (err) {
    console.error(chalk.red(`unable to connect to mongodb. Error: ${err}`));
    process.exit(-1);
  }

  process.on("SIGINT", async () => {
    console.warn("SIGINT captured");
    await closeDb();
    process.exit(-1);
  });
};

startServer();
