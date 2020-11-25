const { pool } = require("../config");

const getIncomming = (request, response) => {
  const { yearmonth } = request.body;

  pool.query(
    `SELECT incomming FROM months where yearmonth= '${yearmonth}'`,
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rows);
    }
  );
};

const setIncomming = (request, response) => {
  const { yearmonth, incomming } = request.body;

  pool.query(
    `INSERT INTO months (yearmonth, incomming) VALUES ('${yearmonth}', ${incomming})`,
    (error) => {
      if (error) {
        throw error;
      }

      response.status(200);
    }
  );
};

const updateIncomming = (request, response) => {
  const { yearmonth, incomming } = request.body;
  pool.query(
    `UPDATE months
    SET incomming = ${incomming}
    WHERE yearmonth = '${yearmonth}';`,

    (error) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: "success" });
    }
  );
};

module.exports = { getIncomming, setIncomming, updateIncomming };
