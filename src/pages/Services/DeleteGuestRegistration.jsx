import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {db} from '../../components/firebase'
import {doc, deleteDoc} from 'firebase/firestore'

export default function DeleteGuestRegistration(props) {

  console.log("Rendering DeleteGuestRegistration.jsx")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const deleteGuestRegistration = async(id) => {
    const eventDoc = doc(db, "guestVisit", id)
    await deleteDoc(eventDoc);
    }

  return (
    <>
      <Button variant="danger" 
      disabled = {props.isDisabled}
      onClick={handleShow}>
        Delete Registration Request
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Registration Request?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The guest will be unable to enter into PSR on the stipulated date
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger"
          onClick={ ()=>
                {deleteGuestRegistration(props.id)}
            }>Delete Registration</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
