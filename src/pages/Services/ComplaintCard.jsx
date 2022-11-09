import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from "../../components/contexts/AuthContext"
import { Timestamp } from 'firebase/firestore'
import { useEffect } from 'react';
import '../../components/card.css'

export default function ComplaintCard(props) {

    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(false);
    const { user } = useAuth()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const day = props.time.split(" ")[0]
    // const date = props.time.split(" ").slice(1,4).join(" ")
    // const time = props.time.split(" ")[4]

    // const final_str = day + ", " + date + " at " + time

    const time = props.time

    useEffect(()=>{
        if (Timestamp.now().toMillis() > time.toMillis() + 300000) {
            setStatus("Status: Maintainence Done")
        } else {
            setStatus("Status: Report Received")
        }
    }, [])

    const timeArr = time.toDate().toLocaleString().split(",")
    const fstring = timeArr[0] + " at " + timeArr[1]

    return (
        <>
        <div className="column">
            <div className="card" id={props.id} onClick={handleShow}>
                <h5><b>{props.name}</b></h5>
                <hr />
                <p>Time: {fstring}</p>
                <p>{status}</p>
            </div>
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
                    <p>Report made on: {fstring}</p>
                    <hr />
                    <p> {status} </p>
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