import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import DeleteEventsPopup from './DeleteEventsPopup'
import { db } from "../../components/firebase"
import { getDoc, doc, arrayUnion, updateDoc, arrayRemove } from "firebase/firestore"
import { useAuth } from "../../components/contexts/AuthContext"

export default function EventCard(props) {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState()
    const [showJoin, setShowJoin] = useState(true)
    const [eventHost, setEventHost] = useState()
    const [eventJoiners, setEventJoiners] = useState("")
    const [joinName, setJoinName] = useState("Join")
    const { user } = useAuth()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    async function joinEvent(eventID) {
        try {
            const eventRef = doc(db, "events", eventID)
            const eventDoc = await getDoc(eventRef)
            const eventParticipants = eventDoc.data().participants
            const userRef = doc(db, "users", user.uid)
            const userDoc = await getDoc(userRef)
            const userData = userDoc.data()
            //If event does not have user
            if (!eventParticipants.includes(userData.name)) {
                updateDoc(eventRef, {
                    participants: arrayUnion(userData.name)
                })
                updateDoc(userRef, {
                    events: arrayUnion(eventID)
                })
            } else {
                //if event has user and is not the host of the event
                if (eventParticipants[0] !== userData.name) {
                    updateDoc(eventRef, {
                        participants: arrayRemove(userData.name)
                    })
                    updateDoc(userRef, {
                        events: arrayRemove(eventID)
                    })
                }
            }
        } catch (e) {
            console.log(e.message)
        }
        setShow(false)
    }

    useEffect(() => {
        const showButtons = async () => {
            const eventRef = doc(db, "events", props.id)
            const eventDoc = await getDoc(eventRef)
            const eventParticipants = eventDoc.data().participants
            const userRef = doc(db, "users", user.uid)
            const userDoc = await getDoc(userRef)
            const userData = userDoc.data()
            setEventHost(eventParticipants[0])
            setEventJoiners(eventParticipants.slice(1).join(", "))
            //If user is in the event
            if (eventParticipants.includes(userData.name)) {
                //if the user is the host allow him to delete
                if (eventParticipants[0] === userData.name) {
                    setEventHost(userData.name + " (You)")
                    setShowDelete(true)
                    setShowJoin(false)
                } else {
                    setShowDelete(false)
                    setShowJoin(true)
                }
                setJoinName("Withdraw")
            } else {
                setShowJoin(true)
                setShowDelete(false)
                setJoinName("Join")
            }
        }
        showButtons()
    }, [show])

    const renderDeleteButton = () => {
        if(showDelete){
            return <DeleteEventsPopup id={props.id} />
        } else {
            return null
        }
    }

    return (
        <>
            <div className="column">
                <div className="card" onClick={handleShow} id={props.id}>
                    <h4 className="title"><b>{props.name}</b></h4>
                    <hr />
                    <p>Time: {props.startTime + " to " + props.endTime}</p>
                    <p>Date: {props.date}</p>
                    <p>Location: {props.location}</p>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><b>{props.name}</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Time: {props.startTime + " to " + props.endTime}</p>
                    <p>Date: {props.date}</p>
                    <p>Location: {props.location}</p>
                    <p><b>Host: {eventHost}</b></p>
                    <p>Other Participants: {eventJoiners}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className = "closebtn" onClick={handleClose}>
                        Close
                    </button>
                    {renderDeleteButton()}
                    <button
                    hidden = {!showJoin}
                    className = "createbtn"
                    onClick={() => { joinEvent(props.id) }}>
                        {joinName}
                    </button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
