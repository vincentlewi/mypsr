import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { db } from '../../components/firebase'
import { doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore'
import { useAuth } from "../../components/contexts/AuthContext"
import { createPath } from 'react-router-dom';

export default function RemoveFavouriteGuest(props) {

    console.log("RemoveFavouriteGuest.jsx")

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { user } = useAuth()

    const removeFavouriteGuest = async (id) => {
        console.log(props.id)
        await updateDoc(doc(db, "guests", id), {
            favouritedBy: arrayRemove(user.uid)
        })
    }

    return (
        <>
            <button className='cancelbtn' disabled={props.isDisabled} onClick={handleShow}>Remove from favourites</button>

            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Remove Guest from favourites?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    The guest will be removed from your favourites list
                </Modal.Body>
                <Modal.Footer>
                    <button className='closebtn' onClick={handleClose}>Close</button>
                    <button onClick={() => { removeFavouriteGuest(props.id) }} className="cancelbtn">Remove</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
