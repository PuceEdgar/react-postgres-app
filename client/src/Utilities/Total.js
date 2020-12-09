import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { getIncomming } from "../Data/ApiCalls";
import { SetIncommingButton } from "../Components/ModalButtons";
import moment from "moment";

export function GetTotal(data) {
  const total = data.reduce(
    (totalAmount, item) => totalAmount + parseInt(item.amount, 10),
    0
  );

  return total;
}

const Total = (props) => {
  const { items } = props;
  const [incomming, setIncomming] = useState(0);
  const totalSpent = GetTotal(items);

  const left = incomming - totalSpent;

  useEffect(() => {
    const yearmonth = `${moment().year()}-${moment().month() + 1}`;
    getIncomming(yearmonth).then((val) => {
      setIncomming(val);
    });
  }, []);
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
              Incomming: {incomming}
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
