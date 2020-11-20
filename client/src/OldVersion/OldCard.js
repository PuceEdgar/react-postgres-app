import React from "react";
import ListItem, { ShowList } from "./ListItem";
import SamePlaceItem from "./SamePlaceItem";
import { GetTotal } from "./Utilities/Total";
import AddSamePlaceForm from "./Forms/AddSamePlace";
import ModalWindow from "./Components/ModalWindow";

function GetItemsByType(items, itemtype) {
  return items.filter((value, i) => {
    return value.type === itemtype;
  });
}

const CardHeader = (props) => {
  const { type, itemsByType } = props;

  const total = GetTotal(itemsByType);
  return (
    <div className="card-header" id="headingOne">
      <h2 className="mb-0">
        <div
          className="btn btn-block text-left "
          type="button"
          data-toggle="collapse"
          data-target={`#${type}`}
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <div className="row">
            <div className="col-6">
              <h4>
                {type} <span className="badge ">( {itemsByType.length} )</span>
              </h4>
            </div>

            <div className="col-6">
              <h4 className="float-right">Total: {total}</h4>
            </div>
          </div>
        </div>
      </h2>
    </div>
  );
};

const SamePlaceListItem = (props) => {
  const { list, removeItem, editItem } = props;
  const values = list.map((item, i) => {
    return (
      <SamePlaceItem
        item={item}
        key={item.id}
        index={item.id}
        removeItem={removeItem}
        editItem={editItem}
      />
    );
  });
  return <div>{values}</div>;
};

const ListGroup = (props) => {
  const { itemsByType, type, removeItem, editItem, handleSubmit } = props;

  const places = itemsByType.map((item, i) => {
    return item.place;
  });

  const distinctPlaces = [...new Set(places)];

  const values = distinctPlaces.map((place, index) => {
    const samePlaceItems = itemsByType.filter((it, i) => {
      return it.place === place;
    });

    if (samePlaceItems.length < 2) {
      return (
        <ListItem
          item={samePlaceItems[0]}
          key={samePlaceItems[0].id}
          index={samePlaceItems[0].id}
          removeItem={removeItem}
          editItem={editItem}
        />
      );
    } else {
      return (
        <div className="container-fluid m-3" key={index}>
          <div className="row">
            <div className="col-6">
              <h5>{samePlaceItems[0].place}</h5>
            </div>
            <div className="col-6 ">
              <ShowList items={samePlaceItems} />
              <ModalWindow
                buttonName="Add item"
                headerName={`Add new ${samePlaceItems[0].place} item`}
                classDescription="btn btn-outline-success float-center"
                bodyComponent={
                  <AddSamePlaceForm
                    item={samePlaceItems[0]}
                    handleSubmit={handleSubmit}
                  />
                }
              />
            </div>
          </div>
          <div className="collapse" id={samePlaceItems[0].place}>
            <div className="card card-body">
              <SamePlaceListItem
                list={samePlaceItems}
                removeItem={removeItem}
                editItem={editItem}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      );
    }
  });
  return (
    <div
      id={type}
      className="collapse show"
      aria-labelledby="headingOne"
      data-parent="#accordionExample"
    >
      <div className="list-group card-body">{values}</div>
    </div>
  );
};

const OldCard = (props) => {
  const { items, type, removeItem, editItem, handleSubmit } = props;
  const itemsByType = GetItemsByType(items, type);

  return (
    <div className="card">
      <CardHeader type={type} itemsByType={itemsByType} />
      <ListGroup
        itemsByType={itemsByType}
        type={type}
        removeItem={removeItem}
        editItem={editItem}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default OldCard;
