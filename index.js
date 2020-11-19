const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { pool } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const getItems = (request, response) => {
  pool.query("SELECT * FROM spendingitems", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addItem = (request, response) => {
  const { type, place, amount, date } = request.body;

  pool.query(
    "INSERT INTO spendingitems (type, place, amount, date) VALUES ($1, $2, $3, $4)",
    [type, place, amount, date],
    (error) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: "success", message: "item added." });
    }
  );
};

app
  .route("/items")
  // GET endpoint
  .get(getItems)
  // POST endpoint
  .post(addItem);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`);
});
