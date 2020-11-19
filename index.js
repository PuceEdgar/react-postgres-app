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

const deleteItem = (request, response) => {
  const { id, type, place, amount, date } = request.body;
  pool.query(`DELETE FROM spendingitems WHERE id = ${id}`, (error) => {
    if (error) {
      throw error;
    }
    response.status(201).json({ status: "success", message: "item deleted." });
  });
};

const updateItem = (request, response) => {
  const { id, type, place, amount, date } = request.body;
  pool.query(
    `UPDATE spendingitems
    SET type = '${type}',
    place = '${place}',
    amount = ${amount},
    date = '${date}'
    WHERE id = ${id};`,
    // [id, type, place, amount, date],
    (error) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: "success", message: "item updated" });
    }
  );
};

app.route("/items").get(getItems);
app.route("/update").post(updateItem);
app.route("/delete").delete(deleteItem);
app.route("/add").post(addItem);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening `);
});
