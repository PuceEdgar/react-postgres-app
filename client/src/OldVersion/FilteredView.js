import React, { useState, useEffect } from "react";
import DatePickerComponent from "../OldVersion/Components/DatePicker";
import RangePicker from "../OldVersion/Components/DateRangePicker";
import { GetTotal } from "../OldVersion/Utilities/Total";

const FilterOptions = (props) => {
  const { filterByDate, filterByPeriod, filterByMonth } = props;
  return (
    <div className="container">
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            className="nav-link active"
            id="nav-day-tab"
            data-toggle="tab"
            href="#nav-day"
            role="tab"
            aria-controls="nav-day"
            aria-selected="true"
          >
            By Day
          </a>
          <a
            className="nav-link"
            id="nav-period-tab"
            data-toggle="tab"
            href="#nav-period"
            role="tab"
            aria-controls="nav-period"
            aria-selected="false"
          >
            By Period
          </a>
          <a
            className="nav-link"
            id="nav-month-tab"
            data-toggle="tab"
            href="#nav-month"
            role="tab"
            aria-controls="nav-month"
            aria-selected="false"
          >
            By Month
          </a>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-day"
          role="tabpanel"
          aria-labelledby="nav-day-tab"
        >
          <DatePickerComponent label="Pick date" filterByDate={filterByDate} />
        </div>
        <div
          className="tab-pane fade"
          id="nav-period"
          role="tabpanel"
          aria-labelledby="nav-period-tab"
        >
          <RangePicker filterByPeriod={filterByPeriod} />
        </div>
        <div
          className="tab-pane fade"
          id="nav-month"
          role="tabpanel"
          aria-labelledby="nav-month-tab"
        >
          <DatePickerComponent
            label="Pick month"
            view="month"
            format="MMMM"
            filterByMonth={filterByMonth}
          />
        </div>
      </div>
    </div>
  );
};

function Table(props) {
  const { items } = props;

  const tableRows = items.map((item, i) => {
    return (
      <tr key={i}>
        <td>{item.type}</td>
        <td>{item.place}</td>
        <td>{item.date}</td>
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

function FilteredItems(props) {
  const { items, filtered } = props;

  if (filtered.length > 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6"></div>
          <div className="col-6">Total: {GetTotal(filtered)}</div>
        </div>
        <Table items={filtered} />
      </div>
    );
  } else {
    return (
      <div>
        <div className="row">
          <div className="col-6"></div>
          <div className="col-6 alert alert-warning text-center" role="alert">
            {/* <h3 className="align-middle">Nothing to filter</h3> */}
          </div>
        </div>
        <Table items={items} />
      </div>
    );
  }
}

function FilteredView(props) {
  // const { items } = props;

  const [filtered, setFiltered] = useState([]);
  const [items, setItems] = useState([]);

  function getData() {
    fetch("http://localhost:9000/getitems")
      .then((res) => res.json())
      .then((res) => {
        const sortedActivities = res.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setItems(sortedActivities);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  function filterByDate(pickedDate) {
    const byDate = items.filter((item, i) => {
      return item.date === pickedDate;
    });

    setFiltered(byDate);
  }

  function filterByPeriod(pickedPeriod) {
    const { from, to } = pickedPeriod;
    const byPeriod = items.filter((item, i) => {
      return item.date >= from && item.date <= to;
    });

    setFiltered(byPeriod);
  }

  function filterByMonth(pickedMonth) {
    console.log("passed month: " + pickedMonth);
    const byMonth = items.filter((item, i) => {
      return new Date(item.date).getMonth() === pickedMonth;
    });

    setFiltered(byMonth);
  }
  return (
    <div className="container m-3">
      <FilterOptions
        items={items}
        filtered={filtered}
        filterByDate={filterByDate}
        filterByPeriod={filterByPeriod}
        filterByMonth={filterByMonth}
      />
      <FilteredItems
        items={items}
        filtered={filtered}
        filterByDate={filterByDate}
        filterByPeriod={filterByPeriod}
        filterByMonth={filterByMonth}
      />
    </div>
  );
}

export default FilteredView;
