import React from "react";
import OldCard from "./OldCard";
import Total from "./Utilities/Total";

const OldAccordion = (props) => {
  const { items, removeItem, editItem, handleSubmit, incomming } = props;

  return (
    <div className="accordion container-fluid" id="accordionExample">
      <Total items={items} incomming={incomming} />

      <OldCard
        items={items}
        type={"Groceries"}
        removeItem={removeItem}
        editItem={editItem}
        handleSubmit={handleSubmit}
      />
      <OldCard
        items={items}
        type={"House"}
        removeItem={removeItem}
        editItem={editItem}
        handleSubmit={handleSubmit}
      />
      <OldCard
        items={items}
        type={"Car"}
        removeItem={removeItem}
        editItem={editItem}
        handleSubmit={handleSubmit}
      />
      <OldCard
        items={items}
        type={"Other"}
        removeItem={removeItem}
        editItem={editItem}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default OldAccordion;
