import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { db } from '../../components/firebase'
import { addDoc, getDoc, doc, collection, Timestamp, setDoc, query, getDocs, where, updateDoc, orderBy, arrayRemove, arrayUnion } from 'firebase/firestore'
import { useAuth } from '../../components/contexts/AuthContext'
import { useForm, Controller } from 'react-hook-form'
import { addDays, format } from 'date-fns';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export default function GuestFormPopup(props) {

  console.log("Rendering GuestFormPopup.jsx")

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setErrorMessage("")
    reset()
  };

  const handleShow = () => setShow(true);

  const [guests, setGuests] = useState([])
  const [errorMessage, setErrorMessage] = useState()
  const { user, username } = useAuth()
  const userRef = doc(db, "users", user.uid)

  function getCurrentTime() {
    const beginningDate = Date.now()
    const beginningDateObject = new Date(beginningDate)
    const timestamp = Timestamp.fromDate(beginningDateObject)
    return timestamp
  }

  async function create(values) {
    if (values.gname == "" || values.gid == "" || values.gemail == "" || values.gpurpose == "" || values.gphonenum == "" || values.dateTime == "" ) {
      setErrorMessage("Please enter all of the required fields")
      setShow(true)
    } else {
      const docRef = doc(db, "guests", values.gemail)
      const guestSnap = await getDoc(docRef)
      const todaydate = new Date().getDay
      const userSnap = await getDoc(userRef)
      const username = userSnap.data().name
      const dateArr = format(values.dateTime, 'yyyy-MM-dd').split("-")
      const datetimestamp = Timestamp.fromDate(new Date(dateArr[0], dateArr[1], dateArr[2], 23, 59))
      try {
        if (guestSnap.exists()) {
          if (values.gfavourite){
            await updateDoc(docRef, {
              name: values.gname,
              guestid: values.gid,
              email: values.gemail,
              phoneNumber: values.gphonenum,
              favouritedBy: arrayUnion(user.uid)
            })
          } else {
            await updateDoc(docRef, {
              name: values.gname,
              guestid: values.gid,
              email: values.gemail,
              phoneNumber: values.gphonenum,
              favouritedBy: arrayRemove(user.uid)
            })
          }
          
          const q = query(collection(db, "guestVisit"), where("guestFirebaseRef", "==", values.gemail), where("resident", "==", username), where("date", "==", values.gdate))
          const querySnapshot = await getDocs(q)
          if (querySnapshot.docs.length > 0) {
            setErrorMessage("The guest has been registered for today")
          } else {
            await addDoc(collection(db, "guestVisit"), {
              date: format(values.dateTime, 'yyyy-MM-dd'),
              guestid: values.gid,
              name: values.gname,
              purpose: values.gpurpose,
              resident: username,
              guestFirebaseRef: values.gemail,
              created: getCurrentTime(),
              datetimestamp: datetimestamp,
              entryTime: format(values.dateTime, 'HH:mm')
            })
            handleClose()
            reset()
          }
        } else {
          if (values.gfavourite) {
            await setDoc(doc(db, 'guests', values.gemail), {
              name: values.gname,
              guestid: values.gid,
              email: values.gemail,
              phoneNumber: values.gphonenum,
              favouritedBy: [user.uid]
            })
          } else {
            await setDoc(doc(db, 'guests', values.gemail),
              {
                name: values.gname,
                guestid: values.gid,
                email: values.gemail,
                phoneNumber: values.gphonenum,
                favouritedBy: []
              })
          }

          await addDoc(collection(db, "guestVisit"), {
            date: values.gdate,
            guestid: values.gid,
            name: values.gname,
            purpose: values.gpurpose,
            resident: username,
            guestFirebaseRef: values.gemail,
            created: getCurrentTime(),
            datetimestamp: datetimestamp,
            entryTime: values.gentrytime
          })
          handleClose()
          reset()
        }
      } catch (e) {
        console.log(e.message)
      }

    }
  }

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      gname: '',
      gid: '',
      gemail: '',
      gpurpose: '',
      gphonenum: '',
      gdate: '',
      gfavourite: '',
      gentrytime: ''
    }
  })

  const onSubmit = (values) => { create(values) }
  // const onSubmit = (values) => { console.log(format(values.dateTime, 'yyyy-MM-dd')) }

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  return (
    <>
      <button onClick={handleShow} className="createbtn">Register Guest</button>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Register New Guest</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Key in all the details necessary for registration</h5>
            <p>Name </p>
            <input {...register('gname')} type="text" />

            <p>Student ID or NRIC</p>
            <input {...register('gid')} type="text" />

            <p>Email</p>
            <input {...register('gemail')} type="email" />

            <p>Phone Number</p>
            <input {...register('gphonenum')} type="text" />

            <p>Purpose</p>
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
            />
            {/* <input {...register('gdate')} type="date" min={new Date().toISOString().split("T")[0]} />
            <p>Entry Time</p>
            <input {...register('gentrytime')} type="time" /> */}
            <p><input {...register('gfavourite')} type="checkbox" /> Add to favourites</p>

            {errorMessage && <div className="error"> {errorMessage} </div>}
          </Modal.Body>
          <Modal.Footer>
            <button className="createbtn" type='submit'>Add guest</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}