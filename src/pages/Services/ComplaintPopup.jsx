import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { db } from '../../components/firebase'
import { addDoc, getDoc, doc, collection, orderBy, query, onSnapshot, Timestamp } from 'firebase/firestore'
import { useAuth } from '../../components/contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { Row, Col, Container } from 'react-bootstrap';
import './services.css';

export default function ComplaintPopup() {

  console.log("Rendering ComplaintPopUp.jsx")

  const [show, setShow] = useState(false);
  const [complaints, setComplaints] = useState([])
  const complaintsCollectionRef = collection(db, 'complaints')
  const [errorMessage, setErrorMessage] = useState()
  const q = query(complaintsCollectionRef, orderBy("time", "asc"))
  const { user } = useAuth()
  const userRef = doc(db, "users", user.uid)

  const handleClose = () => {
    setShow(false)
    setErrorMessage("")
    reset()
  };

  const handleShow = () => setShow(true);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      location: ''
    }
  })

  async function create(values) {
    try {
      if (values.name == "" || values.description == "" || values.location == "") {
        setErrorMessage("Please enter all of the required fields")
        setShow(true)
      } else {
        const userSnap = await getDoc(userRef)
        const docRef = await addDoc(complaintsCollectionRef,
          {
            name: values.name,
            description: values.description,
            location: values.location,
            reporter: userSnap.data().name,
            time: getCurrentTime()
          })
        handleClose();
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const onSubmit = (values) => { create(values) }

  function getCurrentTime() {
    const beginningDate = Date.now()
    const beginningDateObject = new Date(beginningDate)
    const timestamp = Timestamp.fromDate(beginningDateObject)
    return timestamp
  }

  useEffect(
    () =>
      onSnapshot(q, (snapshot) => {
        setComplaints(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
      , [])

  return (
    <>
      <button onClick={handleShow} className="createbtn">Make a Report</button>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Maintenance Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col lg={4} md={3} sm={12}>
                <p>Subject</p>
                </Col>
                <Col lg={8} md={9} sm={12} >
                <input {...register('name')} type="text" className="details"/>
                </Col>
              </Row>
              <Row>
                <Col lg={4} md={3} sm={12}>
                <p>Description</p>
                </Col>
                <Col lg={8} md={9} sm={12} >
                <input {...register('description')} type="text" className="details"/>
                </Col>
              </Row>
              <Row>
                <Col lg={4} md={3} sm={12}>
                <p>Location</p>
                </Col>
                <Col lg={8} md={9} sm={12} >
                <select {...register("location")} className="details">
                  <option value="My Room">My Room</option>
                  <option value="PSR Study Area">PSR Study Area</option>
                  <option value="PSR Dining Area">PSR Dining Area</option>
                  <option value="PSR Classroom">PSR Classroom</option>
                  <option value="PSR Court">PSR Court</option>
                  <option value="PSR Relax Area">PSR Relax Area</option>
                </select>
                </Col>
              </Row>
            </Container>
            {/* <p>Subject</p>
            <input {...register('name')} type="text" />

            <p>Description</p>
            <input {...register('description')} type="text" />

            <p>Location</p>
            <select {...register("location")} >
              <option value="My Room">My Room</option>
              <option value="PSR Study Area">PSR Study Area</option>
              <option value="PSR Dining Area">PSR Dining Area</option>
              <option value="PSR Classroom">PSR Classroom</option>
              <option value="PSR Court">PSR Court</option>
              <option value="PSR Relax Area">PSR Relax Area</option>
            </select> */}

            {errorMessage && <div className="error"> {errorMessage} </div>}

          </Modal.Body>
          <Modal.Footer>
            <button className="createbtn" type='submit'>File complaint</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}