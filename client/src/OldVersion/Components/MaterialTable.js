import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { EditButton, AddSamePlaceButton } from "../ModalButtons";
import DeleteIcon from "@material-ui/icons/Delete";
import { ShowButton } from "../StyleComponents/StyledButtons";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

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

function SingleRow(props) {
  const { row, editItem, deleteData } = props;
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
          <EditButton item={row} editItem={editItem} />
          {/* <Button>Edit</Button> */}
          {/* <Button onClick={() => deleteData(row)}>Delete</Button> */}
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

function CollapsibleRow(props) {
  const { rows, editItem, deleteData, handleSubmit } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {/* <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        <TableCell colSpan="3" align="center">
          {rows[0].place}
        </TableCell>
        <TableCell colSpan="3" />
        <TableCell colSpan="3" />
        {/* <TableCell align="center">{row.date}</TableCell> */}
        {/* <TableCell align="center">{row.amount}</TableCell> */}
        <TableCell colSpan="3" align="center">
          <ShowButton onClick={() => setOpen(!open)}>Show</ShowButton>
          <AddSamePlaceButton handleSubmit={handleSubmit} samePlaceItems={rows}>
            Add item
          </AddSamePlaceButton>
          {/* <Button>Add item</Button> */}
        </TableCell>

        {/* <TableCell align="center">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {/* <Typography variant="h6" gutterBottom component="div">
                {rows[0].place}
              </Typography> */}
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
                    {/* <TableCell align="right">Total price ($)</TableCell> */}
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
                        {/* <Button>Edit</Button> */}
                        {/* <Button onClick={() => deleteData(row)}>Delete</Button> */}
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

export default function MaterialTable(props) {
  const { items, updateData, deleteData, handleSubmit } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell /> */}
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
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
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
