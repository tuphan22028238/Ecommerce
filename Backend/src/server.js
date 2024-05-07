const express = require("express");
const route = require("./routes");
const cookie = require("cookie-parser");
const db = require("./config/db");
require("dotenv").config({ path: "Backend/src/.env" });

const app = express();
const server = require("http").createServer(app);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookie());
app.use(express.json());

route(app);

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log("First project in " + port);
});
