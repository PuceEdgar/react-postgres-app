import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DisplayCalendar from "./OldVersion/Components/Calendar";
import MaterialTabs from "./OldVersion/Components/MaterialTabs";

export default function Navigation() {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Link to="/">Home</Link>
          </div>
          <div className="col-3">
            <Link to="/calendar">Calendar</Link>
          </div>
        </div>

        <hr />

        <Switch>
          <Route exact path="/" component={MaterialTabs} />
          <Route path="/calendar" component={DisplayCalendar} />
        </Switch>
      </div>
    </Router>
  );
}
