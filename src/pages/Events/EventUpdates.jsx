import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { db } from '../../components/firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

export default function EventUpdates(){
        const [events, setEvents] = useState([])
        useEffect(
            () => 
            onSnapshot(query(collection(db, 'events'), orderBy("date", "asc"), orderBy("startTime", "asc")), (snapshot) => {
                setEvents(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
            }), [])

    return(
        <>
         <div className="schedule p-3 mx-auto">
            <div className="activity-section row px-2 d-flex flex-wrap">
                {events.map((event) => {
                    return (    
                    <EventCard
                    key = {event.id}
                    id = {event.id}
                    name={event.name}
                    startTime= {event.startTime}
                    endTime={event.endTime}
                    location={event.location}
                    date={event.date}/>
                    )
                })}
            </div>
        </div>
        </>
       
    );
}