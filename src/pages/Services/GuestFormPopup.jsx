import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import {db} from '../../components/firebase'
// import {doc, deleteDoc} from 'firebase/firestore'
import GuestForm from './GuestForm';

export default function GuestFormPopup(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Register Guest
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Register New Guest</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GuestForm/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClose}>Add Guest</Button>
        </Modal.Footer>
      </Modal>
    </>
  )}