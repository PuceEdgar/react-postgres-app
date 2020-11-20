import React from "react";
import EditItemForm from "./Forms/EditItemForm";
import ModalWindow from "./Components/ModalWindow";

const SamePlaceItem = (props) => {
  const { item, index, removeItem, editItem, handleSubmit } = props;

  return (
    <div className="list-group-item d-flex justify-content-between align-items-center row">
      <div className="col-4">
        <h6 className="float-right">{item.date}</h6>
      </div>
      <div className="col-4">
        <h6 className="float-right">{item.amount}</h6>
      </div>

      <div className="col-3">
        <ModalWindow
          buttonName="EDIT ITEM"
          headerName="Edit item:"
          classDescription="btn btn-outline-warning float-center"
          bodyComponent={
            <EditItemForm
              item={item}
              editItem={editItem}
              handleSubmit={handleSubmit}
            />
          }
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

export default SamePlaceItem;
