DROP TABLE IF EXISTS spendingitems;
DROP TABLE IF EXISTS months;

CREATE TABLE months (
  yearmonth VARCHAR(255) NOT NULL PRIMARY KEY,
  incomming numeric NOT NULL
);


CREATE TABLE spendingitems (
  ID SERIAL PRIMARY KEY,
  yearmonth VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  place VARCHAR(255) NOT NULL,
  amount numeric NOT NULL,
  date date NOT NULL,
  month numeric NOT NULL,
  year numeric NOT NULL,
  CONSTRAINT fk_yearmonth
      FOREIGN KEY(yearmonth) 
	  REFERENCES months(yearmonth)
    ON DELETE SET NULL
);


