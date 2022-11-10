import { useState, useEffect } from "react";
import { db } from '../../components/firebase'
import { collection, query, orderBy, onSnapshot, where, getDoc, doc, Timestamp } from 'firebase/firestore'
import { useAuth } from "../../components/contexts/AuthContext"
import EventCard from "../Events/EventCard";
import NoEvent from "./NoEvent";

export default function HomeEvents() {
    console.log("==RENDER in homeEvents .jsx==")
    // const [events, setEvents] = useState([])
    const { user } = useAuth()

    const eventsRef = collection(db, "events")
    const userRef = doc(db, "users", user.uid)

    const [nextweekevents, setNextWeekEvents] = useState([])
    const [otherevents, setOtherEvents] = useState([])

    async function getEventsDocs() {
        const userDoc = await getDoc(userRef)
        const username = userDoc.data().name
        const q1 = query(eventsRef, where("participants", "array-contains", username), where("endtimestamp", ">", getCurrentTime()), where("endtimestamp", "<", getOneWeekFromNow()), orderBy("endtimestamp", "asc"), orderBy("starttimestamp", "asc"))
        onSnapshot(q1, (snapshot) => {
            setNextWeekEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            // events.map((event) => {
            //     console.log(event)
            //     if (event.endtimestamp < getOneWeekFromNow()) {
            //         setNextWeekEvents(prev => [...prev, event])
            //     } else {
            //         setOtherEvents(prev => [...prev, event])
            //     }
            //     console.log("Next week events are", nextweekevents)
            //     console.log("Other events are", otherevents)
            // })
        },
            error => {
                console.log(error.message)
            })
        const q2 = query(eventsRef, where("participants", "array-contains", username), where("endtimestamp", ">", getOneWeekFromNow()), orderBy("endtimestamp", "asc"), orderBy("starttimestamp", "asc"))
        onSnapshot(q2, (snapshot) => {
            setOtherEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        },
            error => {
                console.log(error.message)
            })
    }

    function getCurrentTime() {
        const beginningDate = Date.now()
        const beginningDateObject = new Date(beginningDate)
        const timestamp = Timestamp.fromDate(beginningDateObject)
        return timestamp
    }

    function getOneWeekFromNow() {
        const beginningDate = Date.now()
        const beginningDateObject = new Date(beginningDate)
        beginningDateObject.setDate(beginningDateObject.getDate() + 7)
        const endDate = new Date(beginningDateObject)
        const timestamp = Timestamp.fromDate(endDate)
        return timestamp
    }

    useEffect(() => {
        getEventsDocs()
    }, [])

    if (nextweekevents.length === 0 && otherevents.length === 0) {
        return (
            <div className="schedule p-3 mx-auto">
                <div className="roww events">
                    <NoEvent />
                </div>
            </div>

        )
    } else if (nextweekevents.length > 0 && otherevents.length > 0) {
        return (
            <>
                <div className="schedule p-3 mx-auto">
                    <div className="roww events">
                        <h1>Your Events in the next 7 days</h1>
                        {nextweekevents.map((event) => {
                            return (
                                <EventCard
                                    key={event.id}
                                    id={event.id}
                                    name={event.name}
                                    startTime={event.startTime}
                                    endTime={event.endTime}
                                    location={event.location}
                                    date={event.date} />
                            )

                        })}
                    </div>
                </div>
                <div className="schedule p-3 mx-auto">
                    <div className="roww events">
                    <h1>Your Other Events</h1>
                        {otherevents.map((event) => {
                            return (
                                <EventCard
                                    key={event.id}
                                    id={event.id}
                                    name={event.name}
                                    startTime={event.startTime}
                                    endTime={event.endTime}
                                    location={event.location}
                                    date={event.date} />
                            )
                        })}
                    </div>
                </div>
            </>
        )
    } else if ((nextweekevents.length > 0 && otherevents.length == 0)) {
        return (
            <>
                <div className="schedule p-3 mx-auto">
                    <div className="roww events">
                        <h1>Your Events in the next 7 days</h1>
                        {nextweekevents.map((event) => {
                            return (
                                <EventCard
                                    key={event.id}
                                    id={event.id}
                                    name={event.name}
                                    startTime={event.startTime}
                                    endTime={event.endTime}
                                    location={event.location}
                                    date={event.date} />
                            )

                        })}
                    </div>
                </div>
            </>
        )
    } else if ((nextweekevents.length == 0 && otherevents.length > 0)) {
        return (
            <>
                <div className="schedule p-3 mx-auto">
                    <div className="roww events">
                    <h1>Your Events</h1>
                        {otherevents.map((event) => {
                            return (
                                <EventCard
                                    key={event.id}
                                    id={event.id}
                                    name={event.name}
                                    startTime={event.startTime}
                                    endTime={event.endTime}
                                    location={event.location}
                                    date={event.date} />
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }
}