import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { db } from '../../components/firebase'
import { addDoc, getDoc, doc, collection, orderBy, query, where, getDocs } from 'firebase/firestore'
import { useAuth } from '../../components/contexts/AuthContext'

export default function RegisterFavouriteGuest(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [guests, setGuests] = useState([])

    const [guestID, setGuestID] = useState("")
    const [purpose, setPurpose] = useState("")
    const [date, setDate] = useState("")
    const [favouriteGuest, setFavouriteGuest] = useState("")

    const { user, username } = useAuth()
    const userRef = doc(db, "users", user.uid)
    const guestsCollectionRef = collection(db, 'guests')

    async function createGuestRegistration(props) {
        try {
            const userSnap = await getDoc(userRef)
            const username = userSnap.data().name
            await addDoc(collection(db, "guestVisit"), {
                date: date,
                id: props.id,
                guestFirebaseRef: props.firebaseref,
                name: props.name,
                purpose: purpose,
                resident: username
            })
            const q = query(collection(db, "guestVisit"), where("resident", "==", username), orderBy("date", "asc"))
            const querySnap = await getDocs(q)
            querySnap.forEach((doc) => {
                console.log(doc.data())
            })
            console.log(guests)
        } catch (e) {
            console.log(e.message)
        }
    }

    async function finishCreating() {
        createGuestRegistration(props);
        handleClose();
    }

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                Register Guest
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Register New Guest</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Registration for {props.name} </h5>
                    <label htmlFor="guestpurpose">Purpose of Visit<input type="text" id='guestpurpose' onChange={(e) => { setPurpose(e.target.value) }} /></label><br />
                    <div className="tw-md:flex tw-md:items-center tw-mb-6">
                        <div className="tw-md:w-1/3">
                            <label className="tw-block tw-text-stone-700 tw-font-bold tw-md:text-right tw-mb-1 tw-md:mb-0 tw-pr-4" for="date">
                                Date of Visit
                            </label>
                        </div>
                        <div className="tw-md:w-2/3">
                            <input className="tw-bg-orange-100 tw-appearance-none tw-border-2 tw-border-orange-100 tw-rounded tw-w-full tw-py-2 tw-px-4 tw-text-yellow-900 tw-leading-tight tw-focus:outline-none tw-focus:bg-white tw-focus:border-orange-700" id="date" type="date" onChange={(e) => { setDate(e.target.value) }} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={finishCreating}>Register Guest</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}