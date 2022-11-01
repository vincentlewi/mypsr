import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from "../../components/contexts/AuthContext"

export default function ComplaintCard(props) {

    const [show, setShow] = useState(false);
    const { user } = useAuth()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const day = props.time.split(" ")[0]
    const date = props.time.split(" ").slice(1,4).join(" ")
    const time = props.time.split(" ")[4]

    const final_str = day + ", " + date + " at " + time

    return (
        <>
            <div className="events-card col-lg-3 col-md-6 col-sm-12" id={props.id} onClick={handleShow}>
                <h5><b>{props.name}</b></h5>
                <hr />
                <p>Time: {final_str}</p>
                <p>Status: Report received</p>
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
                    <h5>Description of report:</h5>
                    <p>{props.desc}</p>
                    <hr />
                    <p>Location: {props.location}</p>
                    <p>Report made on: {final_str}</p>
                    <hr />
                    <p> Status: Report received</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}