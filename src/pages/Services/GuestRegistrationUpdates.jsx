import { useState, useEffect } from "react";
import { db } from '../../components/firebase'
import { collection, query, orderBy, onSnapshot, getDoc, doc, where, Timestamp } from 'firebase/firestore'
import { useAuth } from "../../components/contexts/AuthContext";
import GuestCard from "./GuestCard";

export default function GuestRegistrationUpdates() {

    console.log("Rendering GuestRegistrationUpdates.jsx")
    
    const [guests, setGuests] = useState([])
    const { user } = useAuth()

    function getCurrentTime(){
        const beginningDate = Date.now()
        const beginningDateObject = new Date(beginningDate)
        const timestamp = Timestamp.fromDate(beginningDateObject)
        return timestamp
    }

    async function getGuests() {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        const username = userDoc.data().name
        const q = query(collection(db, "guestVisit"), where("datetimestamp", ">", getCurrentTime()), where("resident", "==", username), orderBy("datetimestamp", "asc"))
        onSnapshot(q, (snapshot) => {
            setGuests(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }, (error)=> {
            console.log(error.message)
        })
    
    }
    useEffect(
        () => {
            getGuests()
        }, [])


    return (
        <>
            <div className="schedule p-3 mx-auto">
                <div className="activity-section row px-2 d-flex flex-wrap">
                    {guests?guests.map((guest) => {
                        return (
                            <GuestCard
                                key={guest.id}
                                id={guest.id}
                                guestid={guest.guestid}
                                name={guest.name}
                                date={guest.date}
                                purpose={guest.purpose}
                                created={guest.created}
                            />
                        )
                    }):"No guest registered yet!"}
                </div>
            </div>
        </>

    )
}