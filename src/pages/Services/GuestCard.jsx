import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { db } from "../../components/firebase"
import { getDoc, doc, Timestamp } from "firebase/firestore"
import { useAuth } from "../../components/contexts/AuthContext"
import DeleteGuestRegistration from "./DeleteGuestRegistration"
import AddToFavourites from './AddToFavourites';
import { Row, Col, Container, Card } from 'react-bootstrap';

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
        const guestRef = visitDoc.data().guestFirebaseRef
        const guestDoc = await getDoc(doc(db, "guests", guestRef))
        if (guestDoc.data().favouritedBy.includes(user.uid)) {
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

    useEffect(() => {

    }, [])

    return (
        <>
            <Col lg={4} md={6} sm={6} className="mb-3" >
                <Card style={{border:'none'}} className="guestpart bg-light" onClick={handleShow} id={props.id}>
                    <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 date">{props.date} at {props.entryTime}</Card.Subtitle>
                    <Card.Text>{props.purpose}</Card.Text>
                    <Card.Subtitle className="mb-2">{status}</Card.Subtitle>
                    </Card.Body>
                </Card>
            </Col>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Report Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Details of Registration</h5>
                    <p>Name: {props.name}</p>
                    <hr />
                    <p>Date: {props.date}</p>
                    <p>Entry time: {props.entryTime}</p>
                    <p>Purpose: {props.purpose}</p>
                    <hr />
                    <p>{status}</p>
                </Modal.Body>
                <Modal.Footer>
                    {!favourited && <AddToFavourites id={props.id} setShow={setShow}/>}
                    <DeleteGuestRegistration id={props.id} />
                </Modal.Footer>
            </Modal>
        </>

    )
}