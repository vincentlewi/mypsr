import React, { useEffect, useState } from "react";
import { doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore'
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../../components/contexts/AuthContext";
import { db } from '../../components/firebase'
import RemoveFavouriteGuest from "./RemoveFavouriteGuest";
import RegisterFavouriteGuest from "./RegisterFavouriteGuest";
import { Row, Col, Container, Card } from 'react-bootstrap';

export default function FavouriteGuestCard(props) {
  console.log("Rendering FavouriteGuestCard.jsx");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useAuth()

  const removeFavouriteGuest = async (id) => {
      console.log(props.id)
      await updateDoc(doc(db, "guests", id), {
          favouritedBy: arrayRemove(user.uid)
      })
      handleClose()
  }



  return (
    <>
      <Col lg={4} md={6} sm={6} className="mb-3 guestpart" id={props.id}>
        <Row>
          <Col lg={9} md={9} sm={9}>
            <span>
              <h5 className="mb-0">{props.name}</h5>
            </span>
          </Col>
          <Col className="reportcomp" lg={3} md={3} sm={3}>
            <img
              src={require("../../assets/closes.png")}
              width="20px"
              onClick= {handleShow}
              style={{cursor:'pointer'}}
              alt="close"
            />
          </Col>
        </Row>
        <Row>
            <Col>
                <RegisterFavouriteGuest
                    id={props.id}
                    guestFirebaseRef={props.id}
                    guestid={props.guestid}
                    name={props.name}
                    email={props.email}
                    phoneNumber={props.phoneNumber}
                    setShow={setShow}
                />
            </Col>
        </Row>
      </Col>


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
                    <button onClick={() => { removeFavouriteGuest(props.id) }} className="cancelbtn">Remove</button>
                </Modal.Footer>
            </Modal>
    </>
  );
}
