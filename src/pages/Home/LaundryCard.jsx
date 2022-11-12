import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { db } from "../../components/firebase"
import { getDoc, doc, arrayUnion, updateDoc, arrayRemove, deleteDoc } from "firebase/firestore"
import { useAuth } from "../../components/contexts/AuthContext"
import DeleteLaundryPopup from './DeleteLaundryPopup';

export default function LaundryCard(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteEvent = async (id) => {
        const eventDoc = doc(db, "laundryEvents", id)
        await deleteDoc(eventDoc);
    }

    const renderDeleteButton = () => {
        return <DeleteLaundryPopup id={props.id} participant={props.participant} date={props.date} timing={props.timing} machine={props.machine} type={props.type}/>
    }


    const fstring = props.type.charAt(0).toUpperCase() + props.type.slice(1);
    return (
        <>
            <div className="column">
                <div className="card" onClick={handleShow} id={props.id}>
                    <h4 className="title"><b>{fstring}</b></h4>
                    <hr />
                    <p>Date: {props.date}</p>
                    <p>Time: {props.timing}</p>
                    <p>Machine: {props.machine}</p>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title><b>{fstring}</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Date: {props.date}</p>
                    <p>Time: {props.timing}</p>
                    <p>Machine: {props.machine}</p>
                </Modal.Body>
                <Modal.Footer>
                    {renderDeleteButton()}
                </Modal.Footer>
            </Modal>

        </>

    )
}
