import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from "../../components/contexts/AuthContext"
import RemoveFavouriteGuest from './RemoveFavouriteGuest';
import RegisterFavouriteGuest from './RegisterFavouriteGuest';

export default function FavouriteGuestCard(props) {

    console.log("Rendering FavouriteGuestCard.jsx")

    const [show, setShow] = useState(false);
    const { user } = useAuth()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="events-card col-lg-3 col-md-6 col-sm-12" id={props.id} onClick={handleShow}>
                <h1><b>{props.name}</b></h1>
                <hr />
                <p> {props.email}</p>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Guest Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Name: {props.name}</p>
                    <hr />
                    <p>ID: {props.guestid}</p>
                    <p>Email: {props.email}</p>
                    <p>Phone Number: {props.phoneNumber}</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <RemoveFavouriteGuest id={props.id}/>
                    <RegisterFavouriteGuest
                         id={props.id}
                         firebaseref={props.id}
                         guestid = {props.guestid}
                         name={props.name}
                         email={props.email}
                         phoneNumber={props.phoneNumber}
                    />
                </Modal.Footer>
            </Modal>
        </>

    )
}