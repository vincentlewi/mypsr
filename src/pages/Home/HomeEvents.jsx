import { useState, useEffect } from "react";
import { db } from '../../components/firebase'
import { collection, query, orderBy, onSnapshot, where, getDoc, doc, Timestamp } from 'firebase/firestore'
import { useAuth } from "../../components/contexts/AuthContext"
import EventCard from "../Events/EventCard";
import NoEvent from "./NoEvent";

export default function HomeEvents() {
    const [events, setEvents] = useState([])
    const { user } = useAuth()

    const eventsRef = collection(db, "events")
    const userRef = doc(db,"users", user.uid )
    
    async function getEventsDocs(){
        const userDoc = await getDoc(userRef)
        const username = userDoc.data().name
        const q = query(eventsRef, where("participants", "array-contains", username ),  where("endtimestamp", ">", getCurrentTime()), orderBy("endtimestamp", "asc"), orderBy("starttimestamp", "asc"))
        onSnapshot(q, (snapshot) => {
            setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        },
        error=>{
            console.log(error.message)
        })
    }

    function getCurrentTime(){
        const beginningDate = Date.now()
        const beginningDateObject = new Date(beginningDate)
        const timestamp = Timestamp.fromDate(beginningDateObject)
        return timestamp
    }

    useEffect(() => {
        getEventsDocs()
    })
           

    return (
        <>
            <div className="schedule p-3 mx-auto">
                <div className="activity-section row px-2 d-flex flex-wrap">
                    {events.length === 0 ? <NoEvent/>:null}
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