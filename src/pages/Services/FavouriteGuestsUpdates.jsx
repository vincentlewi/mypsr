import { useState, useEffect } from "react";
import { db } from '../../components/firebase'
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'
import { useAuth } from "../../components/contexts/AuthContext";
import FavouriteGuestCard from "./FavouriteGuestCard"
import { Container, Row, Col } from "react-bootstrap";

export default function FavouriteGuestsUpdates() {

    console.log("Rendering FavouriteGuestUpdates.jsx")

    const { user } = useAuth()
    const [userFavourites, setUserFavourites] = useState([])

    useEffect(() => {
        const q = query(collection(db, "guests"), where("favouritedBy", "array-contains", user.uid), orderBy("name", "asc"))
        onSnapshot(q, (snapshot) =>{
            setUserFavourites(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }, error=>{
            console.log(error.message)
        })
    } , [])


    return (
        <>
            <div className="schedule p-3 mx-auto">
                <div className="events roww">
                <Row>
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
                </Row>
                </div>
            </div>
        </>

    )
}