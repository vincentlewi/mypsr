import { useState, useEffect } from "react";
import { db } from '../../components/firebase'
import { collection, query, orderBy, onSnapshot, getDoc, doc, where, getDocs } from 'firebase/firestore'
import { useAuth } from "../../components/contexts/AuthContext";
import FavouriteGuestCard from "./FavouriteGuestCard"

export default function FavouriteGuestsUpdates() {
    const { user } = useAuth()
    const [userFavourites, setUserFavourites] = useState([])

    useEffect(() => {
        const q = query(collection(db, "guests"), where("favouritedBy", "array-contains", user.uid), orderBy("name", "asc"))
        onSnapshot(q, (snapshot) =>
            setUserFavourites(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );
    }, [])


    return (
        <>
            <div className="schedule p-3 mx-auto">
                <div className="activity-section row px-2 d-flex flex-wrap">
                    {userFavourites.map((guest) => {
                        return (
                            <FavouriteGuestCard
                                key={guest.id}
                                id={guest.id}
                                guestid={guest.guestid}
                                name={guest.name}
                                email={guest.email}
                                phoneNumber={guest.phoneNumber}
                                guestFirebaseRef={guest.guestFirebaseRef}
                            />
                        )
                    })}
                </div>
            </div>
        </>

    )
}