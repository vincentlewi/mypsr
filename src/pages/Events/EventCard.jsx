import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import DeleteEventsPopup from './DeleteEventsPopup'
import { db } from "../../components/firebase"
import { getDoc, doc, arrayUnion, updateDoc, arrayRemove } from "firebase/firestore"
import { useAuth } from "../../components/contexts/AuthContext"
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function EventCard(props) {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState()
    const [showJoin, setShowJoin] = useState(true)
    const [host, setHost] = useState({name: '', ID: ''})
    const [eventJoiners, setEventJoiners] = useState("")
    const [joinName, setJoinName] = useState("Join")
    const { user } = useAuth()
    const navigate = useNavigate()
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
            setHost({name: eventParticipants[0], ID: eventDoc.data().hostID})
            setEventJoiners(eventParticipants.slice(1).join(", "))
            //If user is in the event
            if (eventParticipants.includes(userData.name)) {
                //if the user is the host allow him to delete
                if (eventParticipants[0] === userData.name) {
                    setHost(prevState => ({
                        ...prevState,
                        name: eventParticipants[0] + ' (You)'
                      }))
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
        {/* <div className="events"> */}
            <div className="column">
                <div className="card" onClick={handleShow} id={props.id}>
                    <h4 className="title"><b>{props.name}</b></h4>
                    <hr className="line"/>
                    <Container>
                        <Row>
                            <Col lg={4} md={4} sm={4} xs={4}>
                            <img src={require("../../assets/calendar.png")} width="30px"/>
                            </Col>
                            <Col lg={8} md={8} sm={8} xs={8}>
                            <p>{format(new Date(`${props.date} ${props.startTime}`), 'dd MMM, HH:mm')}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={4} md={4} sm={4} xs={4}>
                            <img src={require("../../assets/clock.png")} width="30px"/>
                            </Col>
                            <Col lg={8} md={8} sm={8} xs={8}>
                            <p>{props.location}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={4} md={4} sm={4} xs={4}>
                            <img src={require("../../assets/location.png")} width="30px"/>
                            </Col>
                            <Col lg={8} md={8} sm={8} xs={8}>
                            <p>{`${props.participants.length} / ${props.limit} members`}</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            {/* </div> */}
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title><b>{props.name}</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                    <Row>
                        <Col lg={4}><p>Date: </p></Col>
                        <Col lg={8}><p>{props.date}</p></Col>
                    </Row>
                    <Row>
                        <Col lg={4}><p>Time:</p></Col>
                        <Col lg={8}><p>{props.startTime + " to " + props.endTime}</p></Col>
                    </Row>
                    <Row>
                        <Col lg={4}><p>Location: </p></Col>
                        <Col lg={8}><p>{props.location}</p></Col>
                    </Row>
                    <Row>
                        <Col lg={4}><p><b>Host:</b></p></Col>
                        <Col lg={8}>
                        <p><b>{host.name}</b></p>
                    </Col>
                    </Row>
                    <Row>
                        <Col><p>Other Participants:</p></Col></Row>
                        <Row><Col lg={8}><p> {eventJoiners}</p></Col>
                    </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    {renderDeleteButton()}
                    <button 
                        hidden = {!showJoin}
                        onClick={() => navigate('/mypsr/chats', {state: host})} 
                        className="chatbtn"
                    >
                        Chat
                    </button>
                    <button
                        hidden = {!showJoin}
                        className = {(props.participants.length >= props.limit & joinName === 'Join') ? "closebtn" : "createbtn"}
                        onClick={() => { joinEvent(props.id) }}
                        disabled={props.participants.length >= props.limit & joinName === 'Join'}
                    >
                        {joinName}
                    </button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
