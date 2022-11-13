import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { db } from "../../components/firebase"
import { getDoc, doc, arrayUnion, updateDoc, arrayRemove, deleteDoc } from "firebase/firestore"
import { useAuth } from "../../components/contexts/AuthContext"
import DeleteLaundryPopup from './DeleteLaundryPopup';
import { useNavigate } from 'react-router-dom';

export default function LaundryCard(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [host, setHost] = useState({ name: '', ID: '' })
    const [showPrevUser, setShowPrevUser] = useState(false)
    const { user } = useAuth()
    const navigate = useNavigate()

    const renderDeleteButton = () => {
        return <DeleteLaundryPopup id={props.id} participant={props.participant} date={props.date} timing={props.timing} machine={props.machine} type={props.type} />
    }

    const fstring = props.type.charAt(0).toUpperCase() + props.type.slice(1);
    const machinestr = props.machine.charAt(0).toUpperCase() + props.machine.slice(1).substring(0, props.machine.length - 2) + " " + props.machine.charAt(props.machine.length - 1)

    async function getPreviousUser() {
        if (props.type == "washer") {
            const laundryRef = doc(db, "laundry", props.date)
            const laundryData = await getDoc(laundryRef)
            const prevTiming = props.timing.charAt(0) + (Number(props.timing.charAt(1)) - 1) + ":00"
            const prevUser = laundryData.data()[prevTiming][props.machine]
            console.log(Object.keys(prevUser).length > 0)
            if (Object.keys(prevUser).length > 0 && prevUser.ID != user.uid) {
                setShowPrevUser(true)
                setHost({name: prevUser.name, ID: prevUser.ID})
            } 
        } else {
            const laundryRef = doc(db, "dryer", props.date)
            const laundryData = await getDoc(laundryRef)
            const prevTiming = props.timing.charAt(0) + (Number(props.timing.charAt(1)) - 1) + ":00"
            const prevUser = laundryData.data()[prevTiming][props.machine]
            console.log(Object.keys(prevUser).length > 0)
            if (Object.keys(prevUser).length > 0 && prevUser.ID != user.uid) {
                setShowPrevUser(true)
                setHost({name: prevUser.name, ID: prevUser.ID})
            }
        }
    }

    useEffect(() => {
        getPreviousUser()
    }, [])

    return (
        <>
            <div className="column">
                <div className="card" onClick={handleShow} id={props.id}>
                    <h4 className="title"><b>{fstring}</b></h4>
                    <hr />
                    <p>Date: {props.date}</p>
                    <p>Time: {props.timing}</p>
                    <p>Machine: {machinestr}</p>
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
                    <p>Machine: {machinestr}</p>
                    {showPrevUser ? <hr /> : null}
                    {showPrevUser ? <p>Previous Booker: {host.name}</p> : null}
                </Modal.Body>
                <Modal.Footer>
                    { showPrevUser ? <button onClick={() => navigate('/mypsr/chats', { state: host })} className="button button-primary">Chat Previous User</button> : null}
                    {renderDeleteButton()}
                </Modal.Footer>
            </Modal>

        </>

    )
}
