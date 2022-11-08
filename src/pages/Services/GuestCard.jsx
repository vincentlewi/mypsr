import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { db } from "../../components/firebase"
import { getDoc, doc, Timestamp} from "firebase/firestore"
import { useAuth } from "../../components/contexts/AuthContext"
import DeleteGuestRegistration from "./DeleteGuestRegistration"
import AddToFavourites from './AddToFavourites';
import { id } from 'date-fns/locale';

export default function ComplaintCard(props) {

    console.log("Rendering ComplaintCard.jsx")

    const [show, setShow] = useState(false);
    const { user } = useAuth()
    const [favourited, setFavourited] = useState(false)
    const [status, setStatus] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderAddFavouriteButton = () => {
        if (!favourited) {
            return <AddToFavourites id={props.id} />
        } else {
            return null
        }
    }

    const showButtons = async () => {
        const visitRef = doc(db, "guestVisit", props.id)
        const visitDoc = await getDoc(visitRef)
        console.log(visitDoc.data())
        const guestRef = visitDoc.data().guestFirebaseRef
        const guestDoc = await getDoc(doc(db, "guests", guestRef))
        if (guestDoc.data().favouritedBy.includes(user.uid)){
            setFavourited(true)
        } else {
            return null
        }
    }

    useEffect(() => {
        showButtons()

        if (Timestamp.now().toMillis() > props.created.toMillis() + 300000) {
            setStatus("Status: Registration Request Approved")
        } else {
            setStatus("Status: Registration Request Received")
        }
    }, [show])

    useEffect(()=>{
       
    }, [])

    return (
        <>
            <div className="events-card col-lg-3 col-md-6 col-sm-12" id={props.id} onClick={handleShow}>
                <h5><b>Registration: {props.name}</b></h5>
                <hr />
                <p>Date: {props.date}</p>
                <p> {status}</p>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Report Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Details of Registration</h5>
                    <p>Name: {props.name}</p>
                    <hr />
                    <p>Date: {props.date}</p>
                    <p>Purpose: {props.purpose}</p>
                    <hr />
                    <p>{status}</p>
                </Modal.Body>
                <Modal.Footer>
                    {renderAddFavouriteButton()}
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <DeleteGuestRegistration id={props.id} />
                </Modal.Footer>
            </Modal>
        </>

    )
}