import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

const AddItemForm = (props) => {
  const { handleSubmit, type, setShow } = props;
  let initialState = {
    type: type,
    place: "",
    amount: 0,
    date: new Date(),
    month: 0,
    year: 0,
    yearmonth: "",
  };
  const [form, setForm] = useState(initialState);
  const [selectedDate, handleDateChange] = useState(new Date());

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }

  function submitForm() {
    form.date = selectedDate.toLocaleDateString();
    form.year = moment(selectedDate).year();
    form.month = moment(selectedDate).month() + 1;
    form.yearmonth = `${form.year}-${form.month}`;

    handleSubmit(form);
    setShow(false);
    // setForm(initialState);
  }

  const { place, amount } = form;
  return (
    <form>
      <div className="form-group">
        <div className="row">
          <div className="col-4">
            <TextField
              name="place"
              id="place"
              label="Place"
              value={place}
              onChange={handleChange}
            />
          </div>
          <div className="col-4">
            <TextField
              name="amount"
              id="amount"
              label="Amount"
              // type="number"
              value={amount}
              onChange={handleChange}
            />
          </div>
          <div className="col-4">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                autoOk
                label="Choose Date"
                format="dd/MM/yyyy"
                // clearable
                disableFuture
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
      </div>

      <input type="button" value="Submit" onClick={submitForm} />
      {/* <SubmitButton onClick={submitForm}>Submit</SubmitButton> */}
    </form>
  );
};

export default AddItemForm;
