const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var router = express.Router();
router.get("/search", async function (req, res) {
  const { query: { q } } = req;
  await new Promise(res => setTimeout(() => {
    res(true);
  }, 1000));
  
  res.json({
    q,
    code: 0
  })
});

router.post("/search", function (req, res) {
  const { body: { q } } = req;

  res.json({
    q,
    code: 1
  })
});

app.use("/api", router);

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0");
console.log("sever is listening on http://localhost:" + port);
