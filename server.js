const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const api = require("./server/routes/api");
const databaseManager = require("./server/utilities/DB-connection");
const CONFIG = require("./server/config");

const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", api);

databaseManager.connectToDb()

app.listen(CONFIG.PORT, function () {
  console.log(`Server running on ${CONFIG.PORT}`);
});
