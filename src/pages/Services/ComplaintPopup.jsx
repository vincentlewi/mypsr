import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { db } from '../../components/firebase'
import { addDoc, getDoc, doc, collection, orderBy, query, onSnapshot, Timestamp } from 'firebase/firestore'
import { useAuth } from '../../components/contexts/AuthContext'


export default function ComplaintPopup() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [complaints, setComplaints] = useState([])
  const [newName, setNewName] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newLocation, setNewLocation] = useState("")
  const complaintsCollectionRef = collection(db, 'complaints')
  const q = query(complaintsCollectionRef, orderBy("time", "asc"))
  const { user } = useAuth()
  const userRef = doc(db, "users", user.uid)

  console.log("Rendering ComplaintPopUp.jsx")

  function getCurrentTime() {
    const beginningDate = Date.now()
    const beginningDateObject = new Date(beginningDate)
    const timestamp = Timestamp.fromDate(beginningDateObject)
    return timestamp
  }

  async function createMaintainence() {
    try {
      const userSnap = await getDoc(userRef)
      const currentTime = new Date()
      const docRef = await addDoc(complaintsCollectionRef,
        {
          name: newName,
          description: newDescription,
          location: newLocation,
          reporter: userSnap.data().name,
          time: getCurrentTime()
        })
    } catch (e) {
      console.log(e.message)
    }
  }

  async function finishCreating() {
    createMaintainence();
    handleClose();
  }

  useEffect(
    () =>
      onSnapshot(q, (snapshot) => {
        setComplaints(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }), [])

  return (
    <>
      <button onClick={handleShow} className="createbtn">File a maintainence report</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>File your complaint here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor='problem_name'>Subject of Complaint<input type="text" name="" id="problem_name" onChange={(e) => { setNewName(e.target.value) }} /></label>
          <label htmlFor='description'>Description<input type="textarea" name="" id="description" onChange={(e) => { setNewDescription(e.target.value) }} /></label>
          <label>Location
            <select id="location" onChange={(e) => { setNewLocation(e.target.value) }}>
              <option selected disabled hidden>--Select an option--</option>
              <option>My Room</option>
              <option>PSR Study Area</option>
              <option>PSR Dining Area</option>
              <option>PSR Classroom</option>
              <option>PSR Court</option>
              <option>PSR Relax Area</option>
            </select>
          </label>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="closebtn">Close</button>
          <button onClick={finishCreating} className="cancelbtn">File Complaint</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}