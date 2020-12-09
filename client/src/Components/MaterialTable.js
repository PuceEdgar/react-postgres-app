import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { SingleRow, CollapsibleRow } from "./Rows";

function Body(props) {
  const { items, updateData, deleteData, handleSubmit } = props;
  const places = items.map((item, i) => {
    return item.place;
  });

  const distinctPlaces = [...new Set(places)];

  const values = distinctPlaces.map((place, index) => {
    const samePlaceItems = items.filter((it, i) => {
      return it.place === place;
    });

    if (samePlaceItems.length < 2) {
      return (
        <SingleRow
          key={index}
          row={samePlaceItems[0]}
          editItem={updateData}
          deleteData={deleteData}
          handleSubmit={handleSubmit}
        />
      );
    } else {
      return (
        <CollapsibleRow
          key={index}
          rows={samePlaceItems}
          editItem={updateData}
          deleteData={deleteData}
          handleSubmit={handleSubmit}
        />
      );
    }
  });

  return values;
}

export default function MaterialTable(props) {
  const { items, updateData, deleteData, handleSubmit } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell colSpan="3" align="center">
              Place
            </TableCell>
            <TableCell colSpan="3" align="center">
              Date
            </TableCell>
            <TableCell colSpan="3" align="center">
              Amount
            </TableCell>
            <TableCell colSpan="3" align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Body
            items={items}
            updateData={updateData}
            deleteData={deleteData}
            handleSubmit={handleSubmit}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
