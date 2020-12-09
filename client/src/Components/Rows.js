import React from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { EditButton, AddSamePlaceButton } from "./ModalButtons";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { ShowButton } from "../StyleComponents/StyledButtons";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export function SingleRow(props) {
  const { row, editItem, deleteData, handleSubmit } = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell colSpan="3" align="center">
          {row.place}
        </TableCell>
        <TableCell colSpan="3" align="center">
          {row.date}
        </TableCell>
        <TableCell colSpan="3" align="center">
          {row.amount}
        </TableCell>
        <TableCell colSpan="3" align="center">
          <AddSamePlaceButton
            handleSubmit={handleSubmit}
            place={row.place}
            type={row.type}
          >
            Add
          </AddSamePlaceButton>
          <EditButton item={row} editItem={editItem} />
          <Button
            size="small"
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={() => deleteData(row)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export function CollapsibleRow(props) {
  const { rows, editItem, deleteData, handleSubmit } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell colSpan="3" align="center">
          {rows[0].place}
        </TableCell>
        <TableCell colSpan="3" />
        <TableCell colSpan="3" />

        <TableCell colSpan="3" align="center">
          <ShowButton onClick={() => setOpen(!open)}>Show</ShowButton>
          <AddSamePlaceButton
            handleSubmit={handleSubmit}
            place={rows[0].place}
            type={rows[0].type}
          >
            Add item
          </AddSamePlaceButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan="3" />

                    <TableCell align="center" colSpan="3">
                      Date
                    </TableCell>
                    <TableCell align="center" colSpan="3">
                      Amount
                    </TableCell>
                    <TableCell align="center" colSpan="3">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan="3" />
                      <TableCell align="center" colSpan="3">
                        {row.date}
                      </TableCell>
                      <TableCell align="center" colSpan="3">
                        {row.amount}
                      </TableCell>
                      <TableCell align="center" colSpan="3">
                        <EditButton item={row} editItem={editItem} />
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<DeleteIcon />}
                          onClick={() => deleteData(row)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
