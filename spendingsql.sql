CREATE TABLE spendingitems (
  ID SERIAL PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  place VARCHAR(255) NOT NULL,
  amount numeric NOT NULL,
  date date NOT NULL
);


INSERT INTO spendingitems (type, place, amount, date)
VALUES  ('groceries', 'maxima', 1, '2020-11-17');