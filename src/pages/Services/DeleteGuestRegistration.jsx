import React, { useState } from 'react';
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
      <button disabled = {props.isDisabled} onClick={handleShow} className="cancelbtn">Delete Registration Request</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Registration Request?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The guest will be unable to enter into PSR on the stipulated date
        </Modal.Body>
        <Modal.Footer>
          <button
          onClick={ ()=>
            {deleteGuestRegistration(props.id)}}
          className="cancelbtn"
            >
              Delete Registration</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
