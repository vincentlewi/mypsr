import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../../components/contexts/AuthContext";
import { Timestamp } from "firebase/firestore";
import { useEffect } from "react";
import "../../components/card.css";
import { Card } from "react-bootstrap";
import './services.css'

export default function ComplaintCard(props) {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(false);
  const { user } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const time = props.time;

  useEffect(() => {
    if (Timestamp.now().toMillis() > time.toMillis() + 300000) {
      setStatus("Status: Maintenance Done");
    } else {
      setStatus("Status: Report Received");
    }
  }, []);

  const timeArr = time.toDate().toLocaleString().split(",");
  const fstring = timeArr[0] + " at " + timeArr[1];

  return (
    <>
        <Card className="requested card" onClick={handleShow}>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Subtitle className="mb-2 date">{timeArr[0]}</Card.Subtitle>
                <Card.Text className="comment">
                {props.desc}
                </Card.Text>
                <Card.Subtitle className={`status ${status === "Status: Report Received" ? "text-warning" : 'completed'}`}>
                {status}
                </Card.Subtitle>
            </Card.Body>
        </Card>

      <Modal show={show} onHide={handleClose}>
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
  );
}
