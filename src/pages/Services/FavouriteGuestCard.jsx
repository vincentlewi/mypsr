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
        <div className="column">
            <div className="card" id={props.id} onClick={handleShow}>
                <h1><b>{props.name}</b></h1>
                <hr />
                <p> {props.email}</p>
            </div>
        </div>
            <Modal show={show} onHide={handleClose}>
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
                    <button onClick={handleClose} className="closebtn">Close</button>
                    <RemoveFavouriteGuest id={props.id}/>
                    <RegisterFavouriteGuest
                         id={props.id}
                         guestFirebaseRef={props.id}
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