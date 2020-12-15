import React, { useState, useEffect } from "react";
import moment, { months } from "moment";
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  getIncomming,
  setIncomming,
  updateIncomming,
  getPreviousRemaining,
} from "../Data/ApiCalls";

const SetIncommingForm = (props) => {
  const { setShow, setInc } = props;
  const [incomming, setIncom] = useState(0);
  const [selectedDate, handleDateChange] = useState(new Date());

  const [exists, setExists] = useState(false);

  useEffect(() => {
    const yearmonth = moment().format("YYYY-MM");
    let budget = 0;
    getIncomming(yearmonth).then((val) => {
      if (val >= 0) {
        setExists(true);
        setIncom(val);
      }
      budget = val;
    });
    const prevMonth = moment().subtract(1, "months").format("YYYY-MM");
    getPreviousRemaining(prevMonth).then((prevVal) => {
      budget = budget + prevVal;
    });
    setIncom(budget);
  }, []);

  function submitForm() {
    const value = {
      yearmonth: moment(selectedDate).format("YYYY-MM"),
      incomming: incomming,
    };

    if (!exists) {
      setIncomming(value);
      setInc(incomming);
    } else {
      updateIncomming(value);
      setInc(incomming);
    }

    setShow(false);
  }

  return (
    <form>
      <div className="form-group">
        <div className="row">
          <div className="col-4">
            <TextField
              name="incomming"
              id="incomming"
              label="Budget"
              value={incomming}
              onChange={(ev) => setIncom(ev.target.value)}
            />
          </div>

          <div className="col-4">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                views={["year", "month"]}
                label="Year and Month"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
      </div>
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
};

export default SetIncommingForm;
