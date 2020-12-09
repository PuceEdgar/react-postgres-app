import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MaterialTable from "./MaterialTable";
import Total, { GetTotal } from "../Utilities/Total";
import Paper from "@material-ui/core/Paper";
import { AddItemButton } from "./ModalButtons";
import { GetItemsByType } from "../Utilities/Functions";
import { getData, addData, updateData, deleteData } from "../Data/ApiCalls";
import moment from "moment";
import { GROCERIES, CAR, HOUSE, OTHER } from "../Constants/ItemTypes";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 900,
  },
}));

function populateData(setItems) {
  getData().then((val) => {
    const spendingMonth = val.filter((item, i) => {
      return moment(item.date).month() === moment().month();
    });

    setItems(spendingMonth);
  });
}

export default function MaterialTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const [items, setItems] = useState([]);
  const incomming = 1500;

  useEffect(() => {
    populateData(setItems);
    // getData().then((val) => {
    //   const spendingMonth = val.filter((item, i) => {
    //     return moment(item.date).month() === moment().month();
    //   });

    //   setItems(spendingMonth);
    // });
  }, []);

  function addItem(data) {
    addData(data)
      .then((res) => {
        if (res.status === "success") {
          populateData(setItems);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function updateItem(data) {
    updateData(data)
      .then((res) => {
        if (res.status === "success") {
          populateData(setItems);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function deleteItem(data) {
    deleteData(data)
      .then((res) => {
        if (res.status === "success") {
          populateData(setItems);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const groceries = GetItemsByType(items, GROCERIES);

  const car = GetItemsByType(items, CAR);

  const house = GetItemsByType(items, HOUSE);

  const other = GetItemsByType(items, OTHER);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <Total items={items} incomming={incomming} />
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Groceries" {...a11yProps(0)} />
          <Tab label="Car" {...a11yProps(1)} />
          <Tab label="House" {...a11yProps(2)} />
          <Tab label="Other" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <AddItemButton
            handleSubmit={addItem}
            type="groceries"
          ></AddItemButton>
          <MaterialTable
            items={groceries}
            updateData={updateItem}
            deleteData={deleteItem}
            handleSubmit={addItem}
          />
          <Paper className="border m-3">
            <h3 className="text-center p-2">Total: {GetTotal(groceries)}</h3>
          </Paper>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <AddItemButton handleSubmit={addItem} type="car">
            Add Item
          </AddItemButton>
          <MaterialTable
            items={car}
            updateData={updateItem}
            deleteData={deleteItem}
            handleSubmit={addItem}
          />
          <Paper className="border m-3">
            <h4 className="text-center p-2">Total: {GetTotal(car)}</h4>
          </Paper>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <AddItemButton handleSubmit={addItem} type="house">
            Add Item
          </AddItemButton>
          <MaterialTable
            items={house}
            updateData={updateItem}
            deleteData={deleteItem}
            handleSubmit={addItem}
          />
          <Paper className="border m-3">
            <h4 className="text-center p-2">Total: {GetTotal(house)}</h4>
          </Paper>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <AddItemButton handleSubmit={addItem} type="other">
            Add Item
          </AddItemButton>
          <MaterialTable
            items={other}
            updateData={updateItem}
            deleteData={deleteItem}
            handleSubmit={addItem}
          />
          <Paper className="border m-3">
            <h4 className="text-center p-2">Total: {GetTotal(other)}</h4>
          </Paper>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
