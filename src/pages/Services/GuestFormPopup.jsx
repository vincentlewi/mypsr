import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { db } from '../../components/firebase'
import { addDoc, getDoc, doc, collection, Timestamp } from 'firebase/firestore'
import { useAuth } from '../../components/contexts/AuthContext'

export default function GuestFormPopup(props) {

  console.log("Rendering GuestFormPopup.jsx")

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [guests, setGuests] = useState([])

  const [name, setName] = useState("")
  const [guestID, setGuestID] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [purpose, setPurpose] = useState("")
  const [date, setDate] = useState("")
  const [favouriteGuest, setFavouriteGuest] = useState("")

  const { user, username } = useAuth()
  const userRef = doc(db, "users", user.uid)
  const guestsCollectionRef = collection(db, 'guests')

  function getCurrentTime() {
    const beginningDate = Date.now()
    const beginningDateObject = new Date(beginningDate)
    const timestamp = Timestamp.fromDate(beginningDateObject)
    return timestamp
  }

  const dateArr = date.split("-")
  const datetimestamp = Timestamp.fromDate(new Date(dateArr[0], dateArr[1] - 1, dateArr[2], 23, 59))

  async function createGuestRegistration() {
    try {
      const userSnap = await getDoc(userRef)
      const username = userSnap.data().name
      if (favouriteGuest !== "") {
        const docRef = await addDoc(guestsCollectionRef,
          {
            name: name,
            guestid: guestID,
            email: email,
            phoneNumber: phoneNumber,
            favouritedBy: [user.uid]
          })
        await addDoc(collection(db, "guestVisit"), {
          date: date,
          guestid: guestID,
          name: name,
          purpose: purpose,
          resident: username,
          guestFirebaseRef: docRef.id, 
          created: getCurrentTime(),
          datetimestamp: datetimestamp
        })
      } else {
        const docRef = await addDoc(guestsCollectionRef,
          {
            name: name,
            guestid: guestID,
            email: email,
            phoneNumber: phoneNumber,
            favouritedBy: []
          })
        await addDoc(collection(db, "guestVisit"), {
          date: date,
          guestid: guestID,
          name: name,
          purpose: purpose,
          resident: username,
          guestFirebaseRef: docRef.id,
          created: getCurrentTime(),
          datetimestamp: datetimestamp
        })
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  async function finishCreating() {
    createGuestRegistration();
    handleClose();
  }

  return (
    <>
      <button onClick={handleShow} className="createbtn">Register Guest</button>

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
          <h5>Key in all the details necessary for registration</h5>
          <label htmlFor="guestname"> Name <input type="text" id='guestname' onChange={(e) => { setName(e.target.value) }} /></label><br />
          <label htmlFor="guestid"> Student ID or IC Number <input type="text" id='guestid' onChange={(e) => { setGuestID(e.target.value) }} /></label><br />
          <label htmlFor="guestemail"> Email <input type="email" id='guestemail' onChange={(e) => { setEmail(e.target.value) }} /></label><br />
          <label htmlFor="guestpurpose"> Phone Number <input type="text" id='guestnumber' onChange={(e) => { setPhoneNumber(e.target.value) }} /></label><br />
          <label htmlFor="guestpurpose"> Purpose of Visit <input type="text" id='guestpurpose' onChange={(e) => { setPurpose(e.target.value) }} /></label><br />
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
          <label htmlFor="addfavorite"><input type="checkbox" name="" id="addfavorite" onChange={(e) => { setFavouriteGuest(e.target.value) }} />Add to Favorites</label>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="createbtn">Close</button>
          <button onClick={finishCreating} className="cancelbtn">Add Guest</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}