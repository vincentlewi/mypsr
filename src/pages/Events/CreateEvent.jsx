import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { db } from '../../components/firebase'
import { collection, addDoc, query, orderBy, getDoc, doc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore'
import { useAuth } from '../../components/contexts/AuthContext'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, addDays, format } from 'date-fns';
import { Row, Col, Container } from 'react-bootstrap';


export default function CreateNewEvent() {
  console.log('rerendered')
  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); reset()};
  const handleShow = () => setShow(true);
  const [errorMessage, setErrorMessage] = useState()
  const eventsCollectionRef = collection(db, 'events')
  const q = query(eventsCollectionRef, orderBy("date", "asc"), orderBy("startTime", "asc"))
  const { user } = useAuth()
  const userRef = doc(db, "users", user.uid)

  const { register, handleSubmit, watch, control, reset } = useForm()
  useEffect(() => {
    let defaultValues = {}
    defaultValues.name = ""
    defaultValues.date = new Date()
    defaultValues.startTime = ""
    defaultValues.endTime = ""
    defaultValues.location = ""
    reset({ ...defaultValues })
  }, []);

  async function create(values) {
    try {
      const userSnap = await getDoc(userRef)
      const dateArr = format(values.date, 'yyyy-MM-dd').split("-")
      const startTimeArr = format(values.startTime, 'HH:mm').split(":")
      const endTimeArr = format(values.endTime, 'HH:mm').split(":")
      const startTimeStamp = Timestamp.fromDate(new Date(dateArr[0], dateArr[1] - 1, dateArr[2], startTimeArr[0], startTimeArr[1]))
      const endTimeStamp = Timestamp.fromDate(new Date(dateArr[0], dateArr[1] - 1, dateArr[2], endTimeArr[0], endTimeArr[1]))

      if (values.name == "" || values.startTime == "" || values.endTime == "" || values.location == "" || values.date == "") {
        setErrorMessage("Please enter all of the required fields")
        setShow(true)
      } else {
        const docRef = await addDoc(eventsCollectionRef,
          {
            name: values.name,
            date: format(values.date, 'yyyy-MM-dd'),
            startTime: format(values.startTime, 'HH:mm'),
            endTime: format(values.endTime, 'HH:mm'),
            location: values.location,
            participants: [userSnap.data().name],
            hostID: user.uid,
            starttimestamp: startTimeStamp,
            endtimestamp: endTimeStamp
          })

        updateDoc(doc(db, "users", user.uid), {
          events: arrayUnion(docRef.id)
        })
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const onSubmit = (values) => {
    create(values)
    handleClose()
  }
  // const onSubmit = (values) => {console.log(new Date(format(values.startTime.getTime(), 'yyyy-MM-dd HH:mm')))}

  const [name, date, startTime] = watch(['name', 'date', 'startTime'])
  const today = new Date()
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(format(date, 'yyyy-MM-dd ') + format(time.getTime(), 'HH:mm'));

    return currentDate.getTime() < selectedDate.getTime();
  };
  return (
    <>
      <button onClick={handleShow} className="createbtn">Create</button>
      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Event</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Container>
            <Row>
              <Col>
            <span>Event Name</span>
            <input {...register('name')} type="text" style={{width: "100%"}} className="somespace" maxLength={15}/>
            { name === 'ngentot' && <span>gabole</span>}
            </Col>
            <Col>
            <span>Date</span>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  minDate={new Date()}
                  onChange={(e) => field.onChange(e)}
                  dateFormat="yyyy-MM-dd"
                  selected={field.value ? field.value : new Date()}
                  className="somespace"
                />
              )}
              />
            </Col>
            </Row>
            <Row>
              <Col>
            <span>Start Time</span>
            <Controller
              control={control}
              name="startTime"
              render={({ field }) => (
                <DatePicker
                  onChange={(e) => field.onChange(e)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  filterTime={filterPassedTime}
                  dateFormat="hh:mm aa"
                  selected={field.value}
                  className="somespace"
                  />
              )}
              />
            </Col>
            <Col>
            <span>End Time</span>
            <Controller
              control={control}
              name="endTime"
              render={({ field }) => (
                <DatePicker
                  onChange={(e) => field.onChange(e)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  filterTime={(time) => (startTime ? startTime < time : false)}
                  dateFormat="hh:mm aa"
                  selected={field.value}
                  className="somespace"
                  />
                  )}
                  />
            </Col>
            </Row>
            <Row>
              <Col>
            <span>Location</span>
            <input {...register('location')} type="text" style={{width: "100%"}} className="somespace"/>

            {errorMessage && <div className="error"> {errorMessage} </div>}
            </Col>
            </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <button className="createbtn" type='submit'>Create Event</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}