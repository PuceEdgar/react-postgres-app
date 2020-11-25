import React from "react";
import ModalWindow from "./Components/ModalWindow";
import AddItemForm from "./Forms/AddItemForm";
import EditItemForm from "./Forms/EditItemForm";
import AddSamePlaceForm from "./Forms/AddSamePlace";
import SetIncommingForm from "./Forms/SetIncommingForm";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import * as colors from "@material-ui/core/colors/";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.cyan[500] },
    secondary: { main: colors.red[900] },
  },
});

export function EditButton(props) {
  const { item, editItem } = props;

  return (
    <ModalWindow
      name="edit"
      startIcon={<EditIcon />}
      size="small"
      variant="contained"
      color="primary"
      buttonName="EDIT ITEM"
      headerName="Edit item:"
      theme={theme}
      classDescription="btn btn-outline-warning float-center"
      bodyComponent={<EditItemForm item={item} editItem={editItem} />}
    />
  );
}

export function AddItemButton(props) {
  const { handleSubmit, type } = props;

  return (
    <ModalWindow
      name="add"
      startIcon={<AddIcon />}
      buttonName="Add new expense item"
      headerName="Add item info"
      size="large"
      variant="contained"
      classDescription="float-right"
      bodyComponent={<AddItemForm handleSubmit={handleSubmit} type={type} />}
    />
  );
}

export function AddSamePlaceButton(props) {
  const { samePlaceItems, handleSubmit } = props;
  return (
    <ModalWindow
      name="addSameItem"
      buttonName="Add item"
      headerName={`Add new ${samePlaceItems[0].place} item`}
      variant="contained"
      size="small"
      classDescription="btn btn-outline-success float-center"
      bodyComponent={
        <AddSamePlaceForm
          item={samePlaceItems[0]}
          handleSubmit={handleSubmit}
        />
      }
    />
  );
}

export function SetIncommingButton(props) {
  const { setInc } = props;
  return (
    <ModalWindow
      name="add"
      buttonName="Set Incomming"
      headerName="Incomming"
      size="large"
      variant="contained"
      classDescription="float-right"
      bodyComponent={<SetIncommingForm setInc={setInc} />}
    />
  );
}
