import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ModalInfo = forwardRef(({ title, route, action, children, isDualOption }, ref) => {
  const navigator = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigator(route || "");
    if (route === "/home") window.location.reload();
    action();
  };

  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => {
    return handleShow;
  });

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {isDualOption ? (
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
        ) : null}
        <Button variant="primary" onClick={handleClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default ModalInfo;
