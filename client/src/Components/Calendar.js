import React, { useState, useEffect } from "react";
import moment from "moment";
import { GetTotal } from "../Utilities/Total";
import ModalWindow from "./ModalWindow";
import { Paper } from "@material-ui/core";
import { getData } from "../Data/ApiCalls";
import { CAR, GROCERIES, HOUSE, OTHER } from "../Constants/ItemTypes";

function DayTable(props) {
  const { items } = props;

  const tableRows = items.map((item, i) => {
    return (
      <tr key={i}>
        <td>{item.type}</td>
        <td>{item.place}</td>
        <td>{moment(item.date).format("DD/MM/YYYY")}</td>
        <td>{item.amount}</td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Type</th>
          <th scope="col">Place</th>
          <th scope="col">Date</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

function WeekTable(props) {
  const { items } = props;

  const groceries = items.filter((gr, i) => {
    return gr.type === GROCERIES;
  });

  const groceriesTotals = GetTypeTotals(items, GROCERIES);
  const houseTotals = GetTypeTotals(items, HOUSE);
  const otherTotals = GetTypeTotals(items, OTHER);
  const carTotals = GetTypeTotals(items, CAR);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Type</th>
          <th scope="col">Place</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        {groceriesTotals}
        {carTotals}
        {houseTotals}
        {otherTotals}
      </tbody>
    </table>
  );
}

function GetTypeTotals(items, TYPE) {
  const list = items.filter((gr, i) => {
    return gr.type === TYPE;
  });

  if (TYPE === GROCERIES) {
    return (
      <tr>
        <td>{GROCERIES}</td>
        <td></td>
        <td>{GetTotal(list)}</td>
      </tr>
    );
  } else {
    const places = list.map((t, i) => {
      return t.place;
    });
    let uniquePlaces = [...new Set(places)];

    const totals = uniquePlaces.map((it, i) => {
      const placeTotal = list.filter((h, i) => {
        return h.place === it;
      });
      return (
        <tr>
          <td>{TYPE}</td>
          <td>{it}</td>
          <td>{GetTotal(placeTotal)}</td>
        </tr>
      );
    });
    return totals;
  }
}

function Table(props) {
  const { weeks, items, selectedMonth } = props;

  return (
    <table className="table">
      <TableHead />
      <TableBody weeks={weeks} items={items} selectedMonth={selectedMonth} />
    </table>
  );
}

function TableHead() {
  const weekdayNames = [];
  const weekTotal = <th className="align-middle text-center">Week total</th>;

  for (let i = 1; i <= 7; i++) {
    const weekday = (
      <th key={i} className="align-middle text-center">
        {moment().isoWeekday([i]).format("ddd")}
      </th>
    );
    weekdayNames.push(weekday);
  }
  weekdayNames.push(weekTotal);

  return (
    <thead>
      <tr>{weekdayNames}</tr>
    </thead>
  );
}

function TableBody(props) {
  const { weeks, items, selectedMonth } = props;

  const spendingMonth = items.filter((item, i) => {
    return new Date(item.date).getMonth() === selectedMonth.month();
  });

  const prevMonthSpending = items.filter((item, i) => {
    return new Date(item.date).getMonth() === selectedMonth.month() - 1;
  });

  const nextMonthSpending = items.filter((item, i) => {
    return new Date(item.date).getMonth() === selectedMonth.month() + 1;
  });

  let description = "btn btn-outline-warning";
  let monthItems = spendingMonth;
  let weeksLen = weeks.length;
  const rows = weeks.map((week, index) => {
    let weekSpending = 0;
    let weekItems = [];

    const td = week.map((day, i) => {
      let daySpending;
      const style = {
        color: "",
        backgroundColor: "",
      };
      if (index === 0 && day > 20) {
        description = "btn";
        style.color = "black";
        style.backgroundColor = "#e0e0e0";
        daySpending = prevMonthSpending.filter((item, i) => {
          return moment(item.date).date() === day;
        });
      } else if (index === weeksLen - 1 && day < 10) {
        description = "btn ";
        style.color = "black";
        style.backgroundColor = "#e0e0e0";
        daySpending = nextMonthSpending.filter((item, i) => {
          return moment(item.date).date() === day;
        });
      } else {
        description = "btn ";
        style.color = "black";
        style.backgroundColor = "#80cbc4";
        daySpending = spendingMonth.filter((item, i) => {
          return moment(item.date).date() === day;
        });
      }

      const totalPerDay = GetTotal(daySpending);
      weekSpending += totalPerDay;

      if (totalPerDay > 0) {
        weekItems.push(daySpending);

        return (
          <td className="align-middle text-center">
            <ModalWindow
              style={style}
              buttonName={day}
              headerName={`Total spent: ${totalPerDay}`}
              classDescription={description}
              bodyComponent={<DayTable items={daySpending} />}
            />
          </td>
        );
      } else {
        return <td className="align-middle text-center">{day}</td>;
      }
    });

    if (weekSpending > 0) {
      let weekStyle = {
        backgroundColor: "#ff8a65",
      };

      return (
        <tr>
          {td}

          <td className="align-middle text-center">
            <ModalWindow
              style={weekStyle}
              buttonName={weekSpending}
              headerName={`Total spent: ${weekSpending}`}
              classDescription="btn btn-block text-dark"
              bodyComponent={<WeekTable items={weekItems.flat()} />}
            />
          </td>
        </tr>
      );
    } else {
      return <tr>{td}</tr>;
    }
  });

  let monthStyle = {
    backgroundColor: "#ffd54f",
  };

  return (
    <tbody>
      {rows}
      <tr>
        <td colSpan="12" className="align-middle text-center">
          Total in {selectedMonth.format("MMMM")} :{" "}
          <ModalWindow
            style={monthStyle}
            buttonName={GetTotal(monthItems)}
            headerName={`Total spent: ${GetTotal(monthItems)}`}
            classDescription="btn btn-block text-dark"
            bodyComponent={<DayTable items={monthItems.flat()} />}
          />
        </td>
      </tr>
    </tbody>
  );
}

function GetStartOfMonth(month, weeks) {
  let currMonth = month.month();
  let prevMonth = currMonth - 1;
  let prevMonthDays = moment().month(prevMonth).daysInMonth();

  let w = Array.from(weeks[0], (item) =>
    typeof item === "undefined" ? "" : item
  );

  let missingStart = w.lastIndexOf("");
  let deduct = missingStart;
  for (let index = 0; index <= missingStart; index++) {
    w[index] = prevMonthDays - deduct;
    deduct--;
  }

  return w;
}

function GetEndOfMonth(weeks) {
  let len = weeks.length;

  let w = Array.from(weeks[len - 1], (item) =>
    typeof item === "undefined" ? "" : item
  );

  let missingEnd = w.indexOf("");
  let add = 1;
  for (let index = missingEnd; index < 7; index++) {
    w[index] = add;
    add++;
  }

  return w;
}

function GetWeeksOfMonth(month) {
  let dayCount = month.daysInMonth();
  let weeks = [];
  let week = new Array(7);
  for (let index = 1; index <= dayCount; index++) {
    let d = month.date(index).isoWeekday();

    if (week[6] !== undefined) {
      weeks.push(week);
      week = new Array(7);
      week[d - 1] = index;
    } else {
      week[d - 1] = index;
    }

    if (index === dayCount) {
      weeks.push(week);
    }
  }

  let firstWeek = GetStartOfMonth(month, weeks);
  weeks.shift();
  weeks.unshift(firstWeek);

  let lastWeek = GetEndOfMonth(weeks);
  weeks.pop();
  weeks.push(lastWeek);

  return weeks;
}

function DisplayCalendar(props) {
  // const { items } = props;
  const [selectedMonth, setMonth] = useState(moment());
  const [weeks, setWeeks] = useState(GetWeeksOfMonth(selectedMonth));
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData().then((res) => {
      setItems(res);
    });
  }, []);

  function loadNextMonth(props) {
    let nextMonth = props.add(1, "month");

    setMonth(nextMonth);
    setWeeks(GetWeeksOfMonth(selectedMonth));
  }

  function loadPreviousMonth(props) {
    let previousMonth = props.subtract(1, "month");

    setMonth(previousMonth);
    setWeeks(GetWeeksOfMonth(selectedMonth));
  }

  return (
    <Paper elevation={3}>
      <div className="container border">
        <div className="row container m-3">
          <div className="col-3 text-center">
            <button
              className="btn btn-outline-info"
              onClick={() => loadPreviousMonth(selectedMonth)}
            >
              Previous
            </button>
          </div>
          <div className="col-6 text-center">
            <h4 className="text-middle">{selectedMonth.format("MMMM")}</h4>
          </div>
          <div className="col-3 text-center">
            <button
              className="btn btn-outline-info"
              onClick={() => loadNextMonth(selectedMonth)}
            >
              Next
            </button>
          </div>
        </div>
        <div>
          <Table weeks={weeks} selectedMonth={selectedMonth} items={items} />
        </div>
      </div>
    </Paper>
  );
}

export default DisplayCalendar;
