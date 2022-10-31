import { useState, useEffect } from "react";
import { db } from '../../components/firebase'
import { collection, query, orderBy, onSnapshot, where, getDoc, doc } from 'firebase/firestore'
import { useAuth } from "../../components/contexts/AuthContext"
import EventCard from "../Events/EventCard";

export default function HomeEvents() {
    const [events, setEvents] = useState([])
    const { user } = useAuth()

    const eventsRef = collection(db, "events")
    const userRef = doc(db,"users", user.uid )
    
    async function getEventsDocs(){
        const userDoc = await getDoc(userRef)
        const username = userDoc.data().name
        const q = query(eventsRef, where("participants", "array-contains", username ), orderBy("date", "asc"), orderBy("startTime", "asc"))
        onSnapshot(q, (snapshot) => {
            setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
    }

    useEffect(() => {
        getEventsDocs()
    })
           

    return (
        <>
            <div className="schedule p-3 mx-auto">
                <div className="activity-section row px-2 d-flex flex-wrap">
                    <h1>{events.length === 0 ? "Looks like you dont haven't joined any events yet. Join an event today and see your events here!": null}</h1>
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