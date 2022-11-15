import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { db } from '../../components/firebase'
import { addDoc, getDoc, doc, collection, orderBy, query, where, getDocs, Timestamp } from 'firebase/firestore'
import { useAuth } from '../../components/contexts/AuthContext'
import { useForm, Controller } from 'react-hook-form'
import { addDays, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { Row, Col, Container } from 'react-bootstrap';

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


    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            gpurpose: '',
            gdate: '',
            gentrytime: ''
        }
    })

    const onSubmit = (values) => { create(values) }

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
    };

    async function create(values) {
        if (values.dateTime == "" || values.gpurpose == "") {
            setErrorMessage("Please enter all of the required fields")
            setShow(true)
        } else {
            try {
                const dateArr = format(values.dateTime, 'yyyy-MM-dd').split("-")
                const datetimestamp = Timestamp.fromDate(new Date(dateArr[0], dateArr[1] - 1, dateArr[2], 23, 59))
                const userSnap = await getDoc(userRef)
                const username = userSnap.data().name
                const q = query(collection(db, "guestVisit"), where("guestFirebaseRef", "==", props.guestFirebaseRef), where("resident", "==", username), where("date", "==", format(values.dateTime, 'yyyy-MM-dd')))
                const querySnapshot = await getDocs(q)

                if (querySnapshot.docs.length > 0) {
                    setErrorMessage("The guest has been registered for today")
                } else {

                    await addDoc(collection(db, "guestVisit"), {
                        date: format(values.dateTime, 'yyyy-MM-dd'),
                        id: props.id,
                        guestFirebaseRef: props.guestFirebaseRef,
                        name: props.name,
                        purpose: values.gpurpose,
                        resident: username,
                        datetimestamp: datetimestamp,
                        created: getCurrentTime(),
                        entryTime: format(values.dateTime, 'HH:mm')
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
            <span onClick={handleShow} style={{cursor:'pointer', textDecoration:'underline', color:'#024959', fontSize:'10px', marginTop:'0px'}}>Re-Register</span>

            <Modal show={show} onHide={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register New Guest</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Registration for {props.name} </h5>
                        <Container>
                            <Row>
                                <Col sm={3}>
                                <p>Purpose</p>
                                </Col>
                                <Col sm={9}>
                                <input {...register('gpurpose')} type="text" className="details"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={5}>
                                <p>Date and Time</p>
                                </Col>
                                <Col sm={7}>
                                <Controller
                                control={control}
                                name="dateTime"
                                render={({ field }) => (
                                <DatePicker
                                    minDate={new Date()}
                                    maxDate={addDays(new Date(), 6)}
                                    onChange={(e) => field.onChange(e)}
                                    showTimeSelect
                                    filterTime={filterPassedTime}
                                    dateFormat="yyyy-MM-dd hh:mm aa"
                                    selected={field.value}
                                    className="details"
                            />
                            )}
                        />
                                </Col>
                            </Row>
                        </Container>
                        {/* <p>Purpose</p>
                        <input {...register('gpurpose')} type="text" />
                        <p>Date and Time</p>
                        <Controller
                            control={control}
                            name="dateTime"
                            render={({ field }) => (
                            <DatePicker
                                minDate={new Date()}
                                maxDate={addDays(new Date(), 6)}
                                onChange={(e) => field.onChange(e)}
                                showTimeSelect
                                filterTime={filterPassedTime}
                                dateFormat="yyyy-MM-dd hh:mm aa"
                                selected={field.value}
                            />
                            )}
                        /> */}
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