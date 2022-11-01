import React, { useState } from 'react';
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
      <button
      className = "cancelbtn"
      disabled = {props.isDisabled}
      onClick={handleShow}>
        Delete Events
      </button>

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
          Are you sure?
          <br/>
          You cannot retrieve any data that has been deleted!
        </Modal.Body>
        <Modal.Footer>
          <button className = "closebtn" onClick={handleClose}> Close</button>
          <button className = "cancelbtn" onClick={ ()=>
                {deleteEvent(props.id)}
            }>
              Delete Event
            </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

