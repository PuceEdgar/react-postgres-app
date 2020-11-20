import React from "react";
import EditItemForm from "./Forms/EditItemForm";
import ModalWindow from "./Components/ModalWindow";

export const ShowList = (props) => {
  const { items } = props;

  return (
    <div>
      <button
        className="btn btn-outline-info float-left"
        type="button"
        data-toggle="collapse"
        data-target={`#${items[0].place}`}
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        See List
      </button>
    </div>
  );
};

const ListItem = (props) => {
  const { item, index, removeItem, editItem } = props;

  return (
    <div className="list-group-item d-flex justify-content-between align-items-center row">
      <div className="col-3">
        <h5>{item.place}</h5>
      </div>
      <div className="col-2">{item.date}</div>
      <div className="col-2">
        <h5 className="float-right">{item.amount}</h5>
      </div>

      <div className="col-2">
        <ModalWindow
          buttonName="Edit item"
          headerName="Edit current item"
          classDescription="btn btn-outline-warning float-center"
          bodyComponent={<EditItemForm item={item} editItem={editItem} />}
        />
        <button
          className="btn btn-outline-danger float-center"
          type="button"
          onClick={() => removeItem(index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListItem;
