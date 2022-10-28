import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ComplaintPopup() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        File a complaint
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>File your complaints here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label htmlFor='problem_name'>Elaborate on what happens<input type="text" name="" id="problem_name" /></label>
            <label>Location
            <select id = "location">
                <option selected disabled hidden>--Select an option--</option>
                <option>PSR Study Area</option>
                <option>My Room</option>
                <option>PSR Dining Area</option>
                <option>PSR Court</option>
                <option>PSR Relax Area</option>
            </select>
            </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClose}>File Complaint</Button>
        </Modal.Footer>
      </Modal>
    </>
  )}