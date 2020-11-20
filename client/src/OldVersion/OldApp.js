import React from "react";
import "../App.css";
import OldAccordion from "./OldAccardion";
import ModalWindow from "./Components/ModalWindow";
import AddItemForm from "./Forms/AddItemForm";
import MaterialAccordion from "./Components/MaterialAccordion";

class OldApp extends React.Component {
  state = {
    items: [],
    incomming: 1000,
  };

  getData() {
    fetch("http://localhost:9000/getitems")
      .then((res) => res.json())
      .then((res) => {
        var value = [];
        if (res.count() > 0) {
          const sortedActivities = res.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          value = sortedActivities;
        }
        this.setState({ items: value });
      });
  }

  componentDidMount() {
    this.getData();
  }

  addData(data) {
    fetch("http://localhost:9000/additem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedActivities = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        this.setState({ items: sortedActivities });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  deleteData(data) {
    fetch("http://localhost:9000/removeitem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedActivities = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        this.setState({ items: sortedActivities });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  updateData(data) {
    fetch("http://localhost:9000/updateitem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedActivities = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        this.setState({ items: sortedActivities });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  removeItem = (index) => {
    const { items } = this.state;

    const jsonObject = items.filter((item, i) => {
      return item.id === index;
    });

    this.deleteData(jsonObject[0]);
  };

  handleSubmit = (item) => {
    let idArray = this.state.items.map((item) => {
      return item.id;
    });

    var maxId = Math.max(...idArray);
    item.id = maxId + 1;

    this.addData(item);
  };

  editItem = (item) => {
    this.updateData(item);
  };

  render() {
    const { items, incomming } = this.state;

    return (
      <div className="container-fluid">
        <ModalWindow
          buttonName="Add new expense item"
          headerName="Add item info"
          classDescription="btn btn-primary btn-lg btn-block"
          bodyComponent={<AddItemForm handleSubmit={this.handleSubmit} />}
        />

        <OldAccordion
          items={items}
          incomming={incomming}
          handleSubmit={this.handleSubmit}
          removeItem={this.removeItem}
          editItem={this.editItem}
        />
        {/* <MaterialAccordion
          items={items}
          incomming={incomming}
          handleSubmit={this.handleSubmit}
          removeItem={this.removeItem}
          editItem={this.editItem}
        /> */}
      </div>
    );
  }
}

export default OldApp;
