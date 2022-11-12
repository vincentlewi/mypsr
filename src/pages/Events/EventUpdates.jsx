import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { db } from '../../components/firebase'
import { collection, query, orderBy, onSnapshot, where, Timestamp } from 'firebase/firestore'
import '../../components/card.css'

export default function EventUpdates() {
    const [events, setEvents] = useState([])
    useEffect(
        () =>
            onSnapshot(query(collection(db, 'events'), where("starttimestamp", ">", getCurrentTime()), orderBy("starttimestamp", "asc"), orderBy("endtimestamp", "asc")),  (snapshot) => {
                setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            },
            error=> {
                console.log(error.message)
            }), [])

    function getCurrentTime(){
        const beginningDate = Date.now()
        const beginningDateObject = new Date(beginningDate)
        const timestamp = Timestamp.fromDate(beginningDateObject)
        return timestamp
    }

    return (
        <>
            <div className="schedule p-3 mx-auto">
                <div className="events roww">
                    {events.map((event) => {
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

    );
}