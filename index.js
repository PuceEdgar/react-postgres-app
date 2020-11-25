const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
const cors = require("cors");
const {
  getItems,
  addItem,
  deleteItem,
  updateItem,
} = require("./dbQueries/itemsQueries");
const {
  getIncomming,
  setIncomming,
  updateIncomming,
} = require("./dbQueries/monthQueries");
// const { pool } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.route("/items").get(getItems);
app.route("/update").post(updateItem);
app.route("/delete").delete(deleteItem);
app.route("/add").post(addItem);

app.route("/getincomming").post(getIncomming);
app.route("/setincomming").post(setIncomming);
app.route("/updateincomming").post(updateIncomming);

app.use(express.static(path.join(__dirname, "/client/build")));

// Handle React routing, return all requests to React app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});
// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening `);
});
