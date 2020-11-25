import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

const EditItemForm = (props) => {
  const { item, editItem, setShow } = props;

  const [form, setForm] = useState(item);
  const [selectedDate, handleDateChange] = useState(item.date);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }
  function submitForm() {
    form.date = new Date(selectedDate).toLocaleString();
    form.year = moment(selectedDate).year();
    form.month = moment(selectedDate).month() + 1;
    form.yearmonth = `${form.year}-${form.month}`;
    setShow(false);
    editItem(form);
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
              type="number"
              value={amount}
              onChange={handleChange}
            />
          </div>
          <div className="col-4">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                autoOk
                label="Choose Date"
                // format="dd/MM/yyyy"
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

export default EditItemForm;
