import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { db } from '../../components/firebase'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'

export default function DeleteLaundryPopup(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const deleteEvent = async (id) => {
        const eventDoc = doc(db, "laundryEvents", id)
        await deleteDoc(eventDoc);
        if (props.type == "washer") {
            const laundryRef = doc(db, "laundry", props.date)
            await updateDoc(laundryRef, {
                [`${props.timing}.${props.machine}`]: []
            })
        } else {
            const laundryRef = doc(db, "dryer", props.date)
            await updateDoc(laundryRef, {
                [`${props.timing}.${props.machine}`]: []
            })
        }
    }

    return (
        <>
            <button
                className="cancelbtn"
                disabled={props.isDisabled}
                onClick={handleShow}>
                Cancel your booking
            </button>

            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cancel your booking?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure?
                    <br />
                    There are no refunds available
                </Modal.Body>
                <Modal.Footer>
                    <button className="closebtn" onClick={handleClose}> Close</button>
                    <button className="cancelbtn" onClick={() => { deleteEvent(props.id) }
                    }>
                        Cancel booking
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
