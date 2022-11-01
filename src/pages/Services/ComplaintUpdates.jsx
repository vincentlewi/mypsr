import { useState, useEffect } from "react";
import { db } from '../../components/firebase'
import { collection, query, orderBy, onSnapshot, getDoc, doc, where, getDocs } from 'firebase/firestore'
import { useAuth } from "../../components/contexts/AuthContext";
import ComplaintCard from "./ComplaintCard";

export default function ComplaintUpdates() {
    const [complaints, setComplaints] = useState([])
    const { user } = useAuth()

    async function getUserDoc() {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        const username = userDoc.data().name
        const q = query(collection(db, 'complaints'), where("reporter", "==", username), orderBy("time", "asc"))
        onSnapshot(q, (snapshot) => {
            setComplaints(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }, (error)=> {
            console.log(error.message)
        })
    
    }
    useEffect(
        () => {
            getUserDoc()
        }, [])


    return (
        <>
            <div className="schedule p-3 mx-auto">
                <div className="activity-section row px-2 d-flex flex-wrap">
                    {complaints.map((complaint) => {
                        return (
                            <ComplaintCard
                                key={complaint.id}
                                id={complaint.id}
                                name={complaint.name}
                                desc={complaint.description}
                                location={complaint.location}
                                time={complaint.time}
                            />
                        )
                    })}
                </div>
            </div>
        </>

    )
}