import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {db} from '../../components/firebase'
import {doc, deleteDoc} from 'firebase/firestore'

export default function DeleteEventsPopup(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const deleteEvent = async(id) => {
    const eventDoc = doc(db, "events", id)
    await deleteDoc(eventDoc);
    }

  return (
    <>
      <Button variant="danger" 
      disabled = {props.isDisabled}
      onClick={handleShow}>
        Delete Events
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Event?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Cancelling this event changes things
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger"
          onClick={ ()=>
                {deleteEvent(props.id)}
            }>Delete Event</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

