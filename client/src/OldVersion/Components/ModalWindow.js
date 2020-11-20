import React, { useState } from "react";
import { Modal } from "react-bootstrap/";
import Button from "@material-ui/core/Button";
import { AddButton } from "../StyleComponents/StyledButtons";

const ModalButton = (props) => {
  const {
    setShow,
    buttonName,
    name,
    classDescription,
    size,
    variant,
    color,
    startIcon,
    style,
  } = props;

  if (name === "add") {
    return (
      <AddButton
        startIcon={startIcon}
        size={size}
        variant={variant}
        color={color}
        className={classDescription}
        onClick={() => setShow(true)}
        style={style}
      >
        {buttonName}
      </AddButton>
    );
  } else if (name === "edit" || name === "addSameItem") {
    return (
      <Button
        style={style}
        startIcon={startIcon}
        size={size}
        variant={variant}
        color={color}
        className={classDescription}
        onClick={() => setShow(true)}
      >
        {buttonName}
      </Button>
    );
  } else {
    return (
      
      <button
        style={style}
        startIcon={startIcon}
        size={size}
        variant={variant}
        color={color}
        className={classDescription}
        onClick={() => setShow(true)}
      >
        {buttonName}
      </button>
      
    );
  }
};

const ModalHeader = (props) => {
  const { name } = props;
  return (
    <Modal.Header closeButton>
      <Modal.Title>{name}</Modal.Title>
    </Modal.Header>
  );
};

const ModalBody = (props) => {
  const { bodyComponent, setShow } = props;

  return (
    <Modal.Body>
      {React.cloneElement(bodyComponent, { setShow: setShow })}
    </Modal.Body>
  );
};

const ModalFooter = (props) => {
  const { setShow } = props;

  return (
    <Modal.Footer>
      <Button
        type="button"
        className="btn btn-secondary"
        onClick={() => setShow(false)}
      >
        Close
      </Button>
    </Modal.Footer>
  );
};

const ModalWindow = (props) => {
  const {
    headerName,
    buttonName,
    bodyComponent,
    classDescription,
    size,
    color,
    variant,
    startIcon,
    theme,
    name,
    style,
  } = props;
  const [show, setShow] = useState(false);
  return (
    <>
      <ModalButton
        style={style}
        name={name}
        startIcon={startIcon}
        setShow={setShow}
        buttonName={buttonName}
        size={size}
        variant={variant}
        color={color}
        theme={theme}
        classDescription={classDescription}
      />
      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="staticBackdropLabel"
      >
        <ModalHeader name={headerName} />
        <ModalBody bodyComponent={bodyComponent} setShow={setShow} />
        <ModalFooter setShow={setShow} />
      </Modal>
    </>
  );
};

export default ModalWindow;
