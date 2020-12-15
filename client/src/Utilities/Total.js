import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  getIncomming,
  updateRemaining,
  getPreviousRemaining,
} from "../Data/ApiCalls";
import { SetIncommingButton } from "../Components/ModalButtons";
import moment from "moment";

export function GetTotal(data) {
  const total = data.reduce(
    (totalAmount, item) => totalAmount + parseInt(item.amount, 10),
    0
  );

  return total;
}

function UpdateRemainingAmount(yearmonth, left) {
  const value = {
    yearmonth: moment(yearmonth).format("YYYY-MM"),
    remaining: left,
  };
  updateRemaining(value);
}

const Total = (props) => {
  const { items } = props;
  const [incomming, setIncomming] = useState(0);
  const totalSpent = GetTotal(items);
  const yearmonth = `${moment().year()}-${moment().month() + 1}`;
  const previousMonth = `${moment().year()}-${moment().month()}`;
  const left = incomming - totalSpent;
  UpdateRemainingAmount(yearmonth, left);
  useEffect(() => {
    let previousRemaining = 0;
    getPreviousRemaining(previousMonth).then((val) => {
      previousRemaining = val;
    });
    getIncomming(yearmonth).then((val) => {
      const totalBudget = parseInt(previousRemaining) + parseInt(val);

      setIncomming(totalBudget);
    });
  }, [incomming]);
  let classname;
  if (left < 0) {
    classname = "alert alert-danger text-center";
  } else if (left <= 200) {
    classname = "alert alert-warning text-center";
  } else {
    classname = "alert alert-success text-center";
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <SetIncommingButton setInc={setIncomming}></SetIncommingButton>
        </div>
        <div className="col-3">
          <Paper>
            <h5 className="alert alert-success text-center">
              Budget: {incomming}
            </h5>
          </Paper>
        </div>
        <div className="col-3">
          <Paper>
            <h5 className="alert alert-danger text-center">
              Outgoing: {totalSpent}
            </h5>
          </Paper>
        </div>
        <div className="col-3">
          <Paper>
            <h5 className={classname}> Left: {left}</h5>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Total;
