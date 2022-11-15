import { useState, useEffect } from "react";
import { db } from '../../components/firebase'
import { collection, query, orderBy, onSnapshot, getDoc, doc, where, Timestamp } from 'firebase/firestore'
import { useAuth } from "../../components/contexts/AuthContext";
import GuestCard from "./GuestCard";
import { Container, Row, Col } from "react-bootstrap";
import Lottie from "react-lottie";
import animation from "./busy.json"

export default function GuestRegistrationUpdates() {

    console.log("Rendering GuestRegistrationUpdates.jsx")

    const [guests, setGuests] = useState([])
    const { user } = useAuth()

    async function getGuests() {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        const username = userDoc.data().name
        const q = query(collection(db, "guestVisit"), where("datetimestamp", ">", getCurrentTime()), where("resident", "==", username), orderBy("datetimestamp", "asc"))
        onSnapshot(q, (snapshot) => {
            setGuests(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }, (error) => {
            console.log(error.message)
        })
    }

    function getCurrentTime() {
        const beginningDate = Date.now()
        const beginningDateObject = new Date(beginningDate)
        const timestamp = Timestamp.fromDate(beginningDateObject)
        return timestamp
    }

    useEffect(
        () => {
            getGuests()
        }, [])

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <>
            <div className="schedule p-3 mx-auto">
                <div className="events">
            <Row>
                    {guests.length == 0 ? <span><Lottie options={defaultOptions} width={'30vw'} /> <h5 className="text-center">Seems like you're too busy studying, no guests registered yet</h5></span> : null}
                    {guests ? guests.map((guest) => {
                        return (
                            
                                
                                <GuestCard
                                    key={guest.id}
                                    id={guest.id}
                                    guestid={guest.guestid}
                                    name={guest.name}
                                    date={guest.date}
                                    purpose={guest.purpose}
                                    created={guest.created}
                                    entryTime={guest.entryTime}
                                />
                            
                        )
                    }) : "No guest registered yet!"}
            </Row>
                </div>
            </div>
        </>

    )
}