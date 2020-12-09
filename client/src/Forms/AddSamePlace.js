import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

const AddSamePlaceForm = (props) => {
  const { handleSubmit, type, place, setShow } = props;
  const [selectedDate, handleDateChange] = useState(new Date());
  const [state, setState] = useState({
    type: type,
    place: place,
    amount: 0,
    date: new Date(),
    month: 0,
    year: 0,
    yearmonth: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  }
  function submitForm() {
    state.date = selectedDate.toLocaleDateString();
    state.year = moment(selectedDate).year();
    state.month = moment(selectedDate).month() + 1;
    state.yearmonth = `${state.year}-${state.month}`;

    handleSubmit(state);
    setShow(false);
  }

  return (
    <form>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <TextField
              name="amount"
              id="amount"
              label="Amount"
              type="number"
              value={state.amount}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                autoOk
                label="Date"
                format="dd/MM/yyyy"
                disableFuture
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

export default AddSamePlaceForm;
