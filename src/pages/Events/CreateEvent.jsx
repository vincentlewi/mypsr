import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { db } from '../../components/firebase'
import { collection, addDoc, query, orderBy, onSnapshot, getDoc, doc, updateDoc, setDoc, arrayUnion, Timestamp } from 'firebase/firestore'
import { useAuth } from '../../components/contexts/AuthContext'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, addDays, getDate } from 'date-fns';

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

  const { register, handleSubmit, watch, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '', 
      date: '', 
      startTime: '', 
      endTime: '', 
      location: ''
    }
  })

  async function create(values) {
    try {
      const userSnap = await getDoc(userRef)
      const dateArr = values.date.split("-")
      const startTimeArr = values.startTime.split(":")
      const endTimeArr = values.endTime.split(":")
      const startTimeStamp = Timestamp.fromDate(new Date(dateArr[0], dateArr[1] - 1, dateArr[2], startTimeArr[0], startTimeArr[1]))
      const endTimeStamp = Timestamp.fromDate(new Date(dateArr[0], dateArr[1] - 1, dateArr[2], endTimeArr[0], endTimeArr[1]))

      if (values.name == "" || values.startTime == "" || values.endTime == "" || values.location == "" || values.date == "") {
        setErrorMessage("Please enter all of the required fields")
        setShow(true)
      } else {
        const docRef = await addDoc(eventsCollectionRef,
          {
            name: values.name,
            startTime: values.startTime,
            endTime: values.endTime,
            location: values.location,
            date: values.date,
            participants: [userSnap.data().name],
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

  // const onSubmit = (values) => {
  //   create(values)
  //   handleClose()
  // }
  const onSubmit = (values) => {console.log(values)}

  const watchValues = watch('name')
  const today = new Date()
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(today, today.getMinutes()), today.getHours())
  );
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

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
            <p>Event Name</p>
            <input {...register('name')} type="text"/>
            { watchValues === 'ngentot' && <span>gabole</span>}

            <p>Date</p>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  minDate={new Date()}
                  maxDate={addDays(new Date(), 6)}
                  onChange={(e) => field.onChange(e)}
                  showTimeSelect
                  filterTime={filterPassedTime}
                  dateFormat="yyyy-MM-dd hh:mm"
                  selected={field.value}
                />
              )}
            />
            <p>Start Time</p>
            <input {...register('startTime')} type="time"/>

            <p>End Time</p>
            <input {...register('endTime')} type="time"/>

            <p>Location</p>
            <input {...register('location')} type="text"/>

            {errorMessage && <div className="error"> {errorMessage} </div>}
            
            <button className="createbtn" type='submit'>Submit Form</button>
          </Modal.Body>
          <Modal.Footer>
            <button className="closebtn" onClick={handleClose}>Close</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}