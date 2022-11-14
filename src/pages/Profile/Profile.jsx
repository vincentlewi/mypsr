import "./profile.css";
import { db } from "../../components/firebase";
import { doc, getDoc, orderBy } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../../components/firebase";
import { useAuth } from "../../components/contexts/AuthContext";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import PhotoCropper from "./PhotoCropper";
import Topup from "./Topup";
import Modal from "react-bootstrap/Modal";
import { collection, getDocs, where, updateDoc, increment, query, onSnapshot } from "firebase/firestore";
import { Row, Col, Container } from 'react-bootstrap';
import TransactionHistoryCards from "./TransactionHistoryCards";
import { useRef } from "react";
import Lottie from "react-lottie";
import animation from "./lf30_editor_2erpimqf.json"

export default function Profile() {
  // const [walletBalance, setWalletBalance] = useState(50)
  const navigate = useNavigate();
  const { user } = useAuth();
  // const useruser = useUser()
  // console.log(() => useUser())
  const [finalTransaction, setFinalTransactions] = useState([])
  const [showMore, setShowMore] = useState(false);
  const [sortedDesc, setSortedDesc] = useState([])
  const transactionHistory = useRef([])

  function logout() {
    signOut(auth);
    navigate("/");
  }

  // getting user data from firestore
  const userRef = doc(db, "users", user.uid);
  const date = new Date();
  let [userInfo, setUserInfo] = useState({});

  const schoolNames = {
    scis: "School of Computing and Information Systems",
    business: "School of Business",
    economics: "School of Economics",
    accountancy: "School of Accountancy",
    socsc: "School of Social Sciences",
    law: "School of Law",
  };

  async function getUserData() {
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    console.log(userData)
    setUserInfo({
      name: userData.name,
      photo: user.photoURL,
      email: user.email,
      school: schoolNames[user.email.split("@")[1].split(".")[0]],
      year:
        date.getFullYear() - parseInt(user.email.split("@")[0].slice(-4)) + 1,
      address: userData.address,
      wallet: userData.wallet,
    });
  }

  async function getTransactionHistory() {
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    const laundryEventsRef = collection(db, 'laundryEvents')
    console.log(userData.name)
    const q = query(laundryEventsRef, where("participant", "==", userData.name), orderBy("date", "asc"), orderBy("timing", "asc"))
    const laundryEventsData = await getDocs(q)
    const laundryEvents = (laundryEventsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    const topupData = await getDocs(collection(db, `users/${user.uid}/payments`))
    const topupTransactions = (topupData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    laundryEvents.forEach((event) => {
      const day = new Date(event.date)
      if (event.type == "washer") {
        const eventObj = {
          id: "WashingMachine" + "-" + event.transactionDate + "-" + event.timing,
          name: "Washer",
          date: event.transactionDate,
          timing: event.timing,
          price: 2,
          status: event.status,
          transactionDate: new Date(event.transactionDate)
        }
        setFinalTransactions(oldArray => [...oldArray, eventObj])
        transactionHistory.current.push(eventObj)
      } else {
        const eventObj = {
          id: "DryerMachine" + "-" + event.transactionDate + "-" + event.timing,
          name: "Dryer",
          date: event.transactionDate,
          timing: event.timing,
          price: 1,
          status: event.status,
          transactionDate: new Date(event.transactionDate)
        }
        setFinalTransactions(oldArray => [...oldArray, eventObj])
        transactionHistory.current.push(eventObj)
      }
    })
    topupTransactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.created * 1000)
      const transactionDateParts = transactionDate.toDateString().split(" ")
      const eventObj = {
        id: "Topup" + "-" + transactionDateParts[2] + "-" + transactionDateParts[1] + "-" + transactionDateParts[3] + "-" + transactionDate.toTimeString().split(" ")[0],
        name: "Top Up",
        price: transaction.amount_received / 100,
        date: transactionDateParts[2] + " " + transactionDateParts[1] + " " + transactionDateParts[3],
        timing: transactionDate.toTimeString().split(" ")[0],
        status: "Successful",
        transactionDate: transactionDate
      }
      setFinalTransactions(oldArray => [...oldArray, eventObj])
      transactionHistory.current.push(eventObj)
    })
    if (transactionHistory.length > 5) {
      setShowMore(true)
    }
    setSortedDesc(transactionHistory.current.sort((objA, objB) => Number(objB.transactionDate) - Number(objA.transactionDate)))

  }

  async function topUpWallet(uid) {
    const paymentRef = collection(db, `users/${uid}/payments`);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    const docs = await getDocs(paymentRef)
    const results = docs.docs
    results.map((res) => {
      const amountToBeAdded = (res.data().amount) / 100
      updateDoc(doc(db, `users`, user.uid), {
        wallet: userData.wallet + amountToBeAdded
      })
      updateDoc(doc(db, `users/${uid}/payments/`, res.id), {
        amount: 0,
      })
    })
  }

  async function doSth() {
    await topUpWallet(user.uid)
    await getUserData()
    await getTransactionHistory()

    console.log("profile useEffect")
  }

  useEffect(() => {
    doSth()
  }, [])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };


  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <div className="profile">
        <Navbar />
        <PhotoCropper
          key={show}
          show={show}
          setUserInfo={setUserInfo}
          setShow={setShow}
        />
        <Container className="mx-auto mt-3">
          <Row>
            <Col lg={4} md={6} sm={12}>
              <Row>
                <Col className="text-center mx-3 rounded-4 profile_data">
                  {/* <span className="test-start text-secondary">My Profile</span> */}
                  <div className="profimg">
                    <img className="pp" src={userInfo.photo} alt="profile" />
                    <Row>
                      <Col>
                        <span onClick={() => setShow(true)} className="edit" style={{cursor: 'pointer'}}>Edit</span>
                      </Col>
                    </Row>
                  </div>
                  <h3 className="mt-3">{userInfo.name}</h3>
                  <p className="mt-3">{userInfo.email}</p>
                  <p className="mt-3">{userInfo.school}</p>
                  <p className="mt-3">Year {userInfo.year}</p>
                  <p className="mt-3">Blk {userInfo.address}</p>
                  <button className="cancelbtn" onClick={logout}>
                    LOG OUT
                  </button>
                </Col>
              </Row>
            </Col>
            <Col lg={8} md={6} sm={12}>
              <Row>
                <Col className="m-3 rounded-4">
                  <span className="text-start text-secondary">Wallet</span>
                  <Row className="wallet text-center py-3 px-3 rounded">
                    <Col lg={6} md={12} sm={12} className="text-start">
                      <img src={require("../../assets/mypsrwallet.png")} width="200px" className="mb-2" alt="psrWallet" /><br />
                      <span className="fw-bold">Balance: ${userInfo.wallet}</span>
                    </Col>
                    <Col lg={6} md={12} sm={12} className="m-auto mt-3 topupbtn">
                      <button className="createbtn" onClick={handleShow}>
                        Top Up Wallet
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>


              {/* Transaction HIstory */}
              <Row>
                <Col className="m-3 rounded-4 transaction">
                  <span className="text-start text-secondary">Transaction History</span>
                  {sortedDesc.length == 0 ? <Lottie options={defaultOptions} height={400} width={400}/> : null}
                  {sortedDesc.length == 0 ? <h2 className="text-center">No Transactions Yet...</h2> : null}
                  {sortedDesc.map((trans) => {
                        return (
                            <TransactionHistoryCards
                                id={trans.id}
                                key={trans.id}
                                name={trans.name}
                                date={trans.date}
                                timing={trans.timing}
                                price={trans.price}
                                status={trans.status}
                                transactionDate={trans.transactionDate}
                                 />
                        )
                    })}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><h5>How much do you want to top up?</h5></Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Topup />
          </Modal.Body>
          <Modal.Footer>
            Your current Wallet Balance is ${userInfo.wallet}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
