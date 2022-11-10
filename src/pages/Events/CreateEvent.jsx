import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { db } from '../../components/firebase'
import { collection, addDoc, query, orderBy, onSnapshot, getDoc, doc, updateDoc, setDoc, arrayUnion, Timestamp } from 'firebase/firestore'
import { useAuth } from '../../components/contexts/AuthContext'


export default function CreateNewEvent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newName, setNewName] = useState("")
  const [newStartTime, setNewStartTime] = useState("")
  const [newEndTime, setNewEndTime] = useState("")
  const [newLocation, setNewLocation] = useState("")
  const [newDate, setNewDate] = useState("")
  const [errorMessage, setErrorMessage] = useState()
  const [events, setEvents] = useState([])
  const eventsCollectionRef = collection(db, 'events')
  const q = query(eventsCollectionRef, orderBy("date", "asc"), orderBy("startTime", "asc"))
  const { user } = useAuth()
  const userRef = doc(db, "users", user.uid)

  async function createEvent() {
    try {
      const userSnap = await getDoc(userRef)
      const dateArr = newDate.split("-")
      const endTimeArr = newEndTime.split(":")
      const startTimeArr = newStartTime.split(":")
      const endTimeStamp = Timestamp.fromDate(new Date(dateArr[0], dateArr[1] - 1, dateArr[2], endTimeArr[0], endTimeArr[1]))
      const startTimeStamp = Timestamp.fromDate(new Date(dateArr[0], dateArr[1] - 1, dateArr[2], startTimeArr[0], startTimeArr[1]))

      if (newName == "" || newStartTime == "" || newEndTime == "" || newLocation == "" || newDate == "") {
        setErrorMessage("Please enter all of the required fields")
        setShow(true)
      } else {
        const docRef = await addDoc(eventsCollectionRef,
          {
            name: newName,
            startTime: newStartTime,
            endTime: newEndTime,
            location: newLocation,
            date: newDate,
            participants: [userSnap.data().name],
            starttimestamp: startTimeStamp,
            endtimestamp: endTimeStamp
          })

        updateDoc(doc(db, "users", user.uid), {
          events: arrayUnion(docRef.id)
        })

        handleClose();
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  async function finishCreating() {
    createEvent();
  }

  useEffect(
    () =>
      onSnapshot(q, (snapshot) => {
        setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }), [])

  return (
    <>
      <button onClick={handleShow} className="createbtn">Create</button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id='editmodal' className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-stone-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="name">
                  Event Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-orange-100 appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-yellow-900 leading-tight focus:outline-none focus:bg-white focus:border-orange-700" id="name" type="text" onChange={(e) => { setNewName(e.target.value) }} required />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-stone-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="date">
                  Date
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-orange-100 appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-yellow-900 leading-tight focus:outline-none focus:bg-white focus:border-orange-700" id="date" type="date" onChange={(e) => { setNewDate(e.target.value) }} required />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-stone-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="start_time">
                  Start Time
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-orange-100 appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-yellow-900 leading-tight focus:outline-none focus:bg-white focus:border-orange-700" id="startTime" type="time" onChange={(e) => { setNewStartTime(e.target.value) }} required />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-stone-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="end_time">
                  End Time
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-orange-100 appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-yellow-900 leading-tight focus:outline-none focus:bg-white focus:border-orange-700" id="endTime" type="time" onChange={(e) => { setNewEndTime(e.target.value) }} required />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-stone-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="location">
                  Location
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-orange-100 appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-yellow-900 leading-tight focus:outline-none focus:bg-white focus:border-orange-700" id="role" type="text" onChange={(e) => { setNewLocation(e.target.value) }} required />
              </div>
            </div>
            {errorMessage && <div className="error"> {errorMessage} </div>}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="closebtn" onClick={handleClose}>Close</button>
          <button className="createbtn" onClick={finishCreating} >Create</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}