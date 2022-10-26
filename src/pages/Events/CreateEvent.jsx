import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { db } from '../../components/firebase'
import { collection, addDoc, query, orderBy, onSnapshot, getDoc, doc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore'
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
  const [events, setEvents] = useState([])
  const eventsCollectionRef = collection(db, 'events')
  const q = query(eventsCollectionRef, orderBy("date", "asc"), orderBy("startTime", "asc"))
  const { user } = useAuth()
  const userRef = doc(db, "users", user.uid)

  async function createEvent() {
    try {
      console.log("This is who is logged in", user.uid)
      const userSnap = await getDoc(userRef)
      console.log(userSnap.data())
      const docRef = await addDoc(eventsCollectionRef,
        {
          name: newName,
          startTime: newStartTime,
          endTime: newEndTime,
          location: newLocation,
          date: newDate,
          participants: [userSnap.data().name]
        })
      console.log("This is the event id", docRef.id)
      updateDoc(doc(db, "users", user.uid), {
        events: arrayUnion(docRef.id)
      })
    } catch(e) {
      console.log(e.message)
    }
  }

  async function finishCreating() {
    createEvent();
    handleClose();
  }

  useEffect(
    () =>
      onSnapshot(q, (snapshot) => {
        setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }), [])

  return (
    <>
      <button onClick={handleShow} className="px-4 py-1 text-sm text-green-600 font-semibold rounded-full border border-green-200 hover:text-white hover:bg-green-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">Create</button>
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
                <label className="block text-stone-700 font-bold md:text-right mb-1 md:mb-0 pr-4" for="name">
                  Event Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-orange-100 appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-yellow-900 leading-tight focus:outline-none focus:bg-white focus:border-orange-700" id="name" type="text" onChange={(e) => { setNewName(e.target.value) }} />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-stone-700 font-bold md:text-right mb-1 md:mb-0 pr-4" for="date">
                  Date
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-orange-100 appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-yellow-900 leading-tight focus:outline-none focus:bg-white focus:border-orange-700" id="date" type="date" onChange={(e) => { setNewDate(e.target.value) }} />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-stone-700 font-bold md:text-right mb-1 md:mb-0 pr-4" for="start_time">
                  Start Time
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-orange-100 appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-yellow-900 leading-tight focus:outline-none focus:bg-white focus:border-orange-700" id="startTime" type="time" onChange={(e) => { setNewStartTime(e.target.value) }} />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-stone-700 font-bold md:text-right mb-1 md:mb-0 pr-4" for="end_time">
                  End Time
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-orange-100 appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-yellow-900 leading-tight focus:outline-none focus:bg-white focus:border-orange-700" id="endTime" type="time" onChange={(e) => { setNewEndTime(e.target.value) }} />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-stone-700 font-bold md:text-right mb-1 md:mb-0 pr-4" for="location">
                  Location
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-orange-100 appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-yellow-900 leading-tight focus:outline-none focus:bg-white focus:border-orange-700" id="role" type="text" onChange={(e) => { setNewLocation(e.target.value) }} />
              </div>
            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-full" onClick={handleClose}>Close</button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={finishCreating} >Create</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}