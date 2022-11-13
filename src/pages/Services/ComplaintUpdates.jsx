import { useState, useEffect } from "react";
import { db } from '../../components/firebase'
import { collection, query, orderBy, onSnapshot, getDoc, doc, where } from 'firebase/firestore'
import { useAuth } from "../../components/contexts/AuthContext";
import ComplaintCard from "./ComplaintCard";
import { Container, Row, Col } from "react-bootstrap";
import './services.css'
import animation from "./maintainence.json"
import Lottie from "react-lottie";

export default function ComplaintUpdates() {
    const [complaints, setComplaints] = useState([])
    const { user } = useAuth()

    console.log("Rendering ComplaintUpdates.jsx")

    async function getUserDoc() {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        const username = userDoc.data().name
        const q = query(collection(db, 'complaints'), where("reporter", "==", username), orderBy("time", "asc"))
        onSnapshot(q, (snapshot) => {
            setComplaints(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }, (error) => {
            console.log(error.message)
        })

    }
    useEffect(
        () => {
            getUserDoc()
        }, [])

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <>
            <Container className="p-3 mx-auto">
                
                    {complaints.length == 0 ? <span><Lottie options={defaultOptions} width={'30vw'} /><h5 className="text-center">Nothing to fix yet, so stay happy !</h5></span>:null}
                    {complaints.map((complaint) => {
                        return (
                            <Row>
                            <Col lg={4} md={6} sm={6} className="mb-3 laundry">
                                <ComplaintCard
                                    key={complaint.id}
                                    id={complaint.id}
                                    name={complaint.name}
                                    desc={complaint.description}
                                    location={complaint.location}
                                    time={complaint.time}
                                />
                            </Col>
                            </Row>)
                    })}
                
            </Container>
        </>

    )
}