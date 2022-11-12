import { useState, useEffect } from "react";
import { db } from '../../components/firebase'
import { collection, query, orderBy, onSnapshot, where, getDoc, doc, Timestamp } from 'firebase/firestore'
import { useAuth } from "../../components/contexts/AuthContext"
import EventCard from "../Events/EventCard";
import NoEvent from "./NoEvent";
import LaundryCard from "./LaundryCard";
import Lottie from "react-lottie";
import laundryAnimationData from "./89833-laundry.json"
import { useNavigate } from "react-router-dom";

export default function HomeLaundryEvents() {
    console.log("==RENDER in homeLaundryEvents.jsx==")
    const [events, setEvents] = useState([])
    const { user } = useAuth()

    const navigate = useNavigate()

    const laundryEventsRef = collection(db, "laundryEvents")
    const userRef = doc(db, "users", user.uid)

    async function getEventsDocs() {
        const userDoc = await getDoc(userRef)
        const username = userDoc.data().name
        const q = query(laundryEventsRef, where("participant", "==", username), where("status", "==", "Booked"),orderBy("date", "asc"), orderBy("timing", "asc"))
        onSnapshot(q, (snapshot) => {
            setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        },
            error => {
                console.log(error.message)
            })
    }

    function getCurrentTime() {
        const beginningDate = Date.now()
        const beginningDateObject = new Date(beginningDate)
        const timestamp = Timestamp.fromDate(beginningDateObject)
        console.log("Current time is", beginningDateObject)
        return timestamp
    }

    function getOneWeekFromNow() {
        const beginningDate = Date.now()
        const beginningDateObject = new Date(beginningDate)
        beginningDateObject.setDate(beginningDateObject.getDate() + 7)
        const endDate = new Date(beginningDateObject)
        const timestamp = Timestamp.fromDate(endDate)
        console.log("One week from now is", endDate)
        return timestamp
    }

    useEffect(() => {
        getEventsDocs()
    }, [])

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: laundryAnimationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };


    if (events.length === 0) {
        return (
            <div className="schedule p-3 mx-auto">
                <div className="roww events">
                    <div className="noevent">
                        <Lottie options={defaultOptions} height={400} width={400} />
                        <h2 style={{textAlign: "center"}}>You do not have any laundry scheduled</h2>
                        <br></br>
                        <button className="createbtn" onClick={() => {
                            navigate("/mypsr/laundry")
                        }}>Book a laundry slot now</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <>
                <div className="schedule p-3 mx-auto">
                    <div className="roww events">
                        <h1>Your Upcoming Laundry</h1>
                        {events.length === 0 ? <NoEvent /> : null}
                        {events.map((event) => {
                            console.log(event)
                            return (
                                <LaundryCard
                                    key={event.id}
                                    id={event.id}
                                    participant={event.participant}
                                    timing={event.timing}
                                    machine={event.machine}
                                    date={event.date}
                                    type={event.type}
                                />
                            )
                        })}
                    </div>
                </div>
            </>

        );
    }
}
