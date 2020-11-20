import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";

const EditItemForm = (props) => {
  const { item, editItem, setShow } = props;

  const [form, setForm] = useState(item);
  const [selectedDate, handleDateChange] = useState(new Date(item.date));

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }
  function submitForm() {
    form.date = selectedDate.toLocaleDateString();
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
                label="Date"
                format="MM/dd/yyyy"
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
