const { pool } = require("../config");
const moment = require("moment");
const getItems = (request, response) => {
  pool.query("SELECT * FROM spendingitems", (error, results) => {
    if (error) {
      throw error;
    }
    const res = results.rows;

    res.forEach((element) => (element.date = moment(element.date).format("L")));

    response.status(200).json(res);
  });
};

const addItem = (request, response) => {
  const { type, place, amount, date, month, year, yearmonth } = request.body;
  console.log(yearmonth);
  pool.query(
    "INSERT INTO spendingitems (type, place, amount, date, month, year, yearmonth) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [type, place, amount, date, month, year, yearmonth],

    (error) => {
      if (error) {
        throw error;
      }

      response.status(201).json({ status: "success", message: "item added." });
    }
  );
};

const deleteItem = (request, response) => {
  const { id } = request.body;
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

    (error) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: "success", message: "item updated" });
    }
  );
};

module.exports = { getItems, addItem, deleteItem, updateItem };
