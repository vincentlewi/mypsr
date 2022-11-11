import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { db } from '../../components/firebase'
import { addDoc, getDoc, doc, collection, orderBy, query, where, getDocs, Timestamp } from 'firebase/firestore'
import { useAuth } from '../../components/contexts/AuthContext'
import { useForm } from 'react-hook-form'

export default function RegisterFavouriteGuest(props) {

    console.log("Rendering RegisterFavouriteGuest.jsx")

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [guests, setGuests] = useState([])
    const [errorMessage, setErrorMessage] = useState()

    const { user, username } = useAuth()
    const userRef = doc(db, "users", user.uid)
    const guestsCollectionRef = collection(db, 'guests')

    function getCurrentTime() {
        const beginningDate = Date.now()
        const beginningDateObject = new Date(beginningDate)
        const timestamp = Timestamp.fromDate(beginningDateObject)
        return timestamp
    }


    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            gpurpose: '',
            gdate: '',
            gentrytime: ''
        }
    })

    const onSubmit = (values) => { create(values) }

    async function create(values) {
        if (values.gdate == "" || values.gentrytime == "" | values.gpurpose == "") {
            setErrorMessage("Please enter all of the required fields")
            setShow(true)
        } else {
            try {
                const dateArr = values.gdate.split("-")
                const datetimestamp = Timestamp.fromDate(new Date(dateArr[0], dateArr[1] - 1, dateArr[2], 23, 59))
                const userSnap = await getDoc(userRef)
                const username = userSnap.data().name
                const q = query(collection(db, "guestVisit"), where("guestFirebaseRef", "==", props.guestFirebaseRef), where("resident", "==", username), where("date", "==", values.gdate))
                const querySnapshot = await getDocs(q)

                if (querySnapshot.docs.length > 0) {
                    setErrorMessage("The guest has been registered for today")
                } else {

                    await addDoc(collection(db, "guestVisit"), {
                        date: values.gdate,
                        id: props.id,
                        guestFirebaseRef: props.guestFirebaseRef,
                        name: props.name,
                        purpose: values.gpurpose,
                        resident: username,
                        datetimestamp: datetimestamp,
                        created: getCurrentTime(),
                        entryTime: values.gentrytime
                    })
                    handleClose()
                    reset()
                    props.setShow(false)
                }
            } catch (e) {
                console.log(e.message)
            }
        }
    }

    return (
        <>
            <button className='createbtn' onClick={handleShow}>Re-register Guest</button>

            <Modal show={show} onHide={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register New Guest</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Registration for {props.name} </h5>
                        <p>Purpose</p>
                        <input {...register('gpurpose')} type="text" />
                        <p>Date</p>
                        <input {...register('gdate')} type="date" min={new Date().toISOString().split("T")[0]} />
                        <p>Entry Time</p>
                        <input {...register('gentrytime')} type="time" />

                        {errorMessage && <div className="error"> {errorMessage} </div>}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='createbtn' type="submit">Register Guest</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}