import "./profile.css";
import { db } from "../../components/firebase";
import { doc, getDoc } from "firebase/firestore";
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
import { collection, getDocs, where, updateDoc, increment } from "firebase/firestore";
import { Row, Col, Container } from 'react-bootstrap';

export default function Profile() {
  // const [walletBalance, setWalletBalance] = useState(50)
  const navigate = useNavigate();
  const { user } = useAuth();
  // const useruser = useUser()
  // console.log(() => useUser())

  function logout() {
    signOut(auth);
    navigate("/mypsr");
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
    console.log(userData.wallet) //firebase
    console.log(userInfo.wallet) //js
  }

  async function topUpWallet(uid){
    const paymentRef = collection(db, `users/${uid}/payments`);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    const docs = await getDocs(paymentRef)
    const results = docs.docs
    results.map((res) => {
        const amountToBeAdded = (res.data().amount)/100
        updateDoc(doc(db, `users`, user.uid), {
            wallet: userData.wallet + amountToBeAdded
        })
        updateDoc(doc(db, `users/${uid}/payments/`, res.id), {
          amount : 0,
        })
    })
}






useEffect(()=>{
  async function doSth(){
    await topUpWallet(user.uid)
    getUserData()
    console.log("profile useEffect")
  }

  doSth()
}, [])


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
                  <span onClick={() => setShow(true)} className="edit">Edit</span>
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
                  <img src={require("../../assets/mypsrwallet.png")} width="200px" className="mb-2"/><br/>
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

              <Row>
                <Col className="m-3 rounded-4 transaction">
                <span className="text-start text-secondary">Transaction History</span>
                <Row className="history text-center py-3 px-3 rounded">
                  <Col lg={6} md={6} sm={6} className="text-start">
                  <h2>Laundry</h2>
                  <span className="text-secondary date">18 Sep 2022</span>
                  </Col>
                  <Col lg={6} md={6} sm={6} className="m-auto text-end">
                  <h5>- 3.00</h5>
                  </Col>
                </Row>

                <Row className="topup text-center py-3 px-3 rounded">
                  <Col lg={6} md={6} sm={6} className="text-start">
                  <h2>Top Up</h2>
                  <span className="text-secondary date">17 Sep 2022</span>
                  </Col>
                  <Col lg={6} md={6} sm={6} className="m-auto text-end">
                  <h5>+ 3.00</h5>
                  </Col>
                </Row>

                </Col>
              </Row>
              

            </Col>
          </Row>
        </Container>







        {/* <h1>ini profile</h1>
        <h3>name: {userInfo.name}</h3>
        <h3>Profile Picture: </h3>
        <img className="pp" src={userInfo.photo} alt="profile" />
        <br />
        <button onClick={() => setShow(true)}>Change profile picture</button>
        <h3>email: {userInfo.email}</h3>
        <h3>school: {userInfo.school}</h3>
        <h3>year: {userInfo.year}</h3>
        <h3>address: {userInfo.address}</h3>
        <h3>wallet: {userInfo.wallet}</h3> */}
        {/* <h3>wallet-v: {walletBalance}</h3> */}
        {/* <button className="cancelbtn" onClick={logout}>
          LOG OUT
        </button>






        <button className="createbtn" onClick={handleShow}>
          Top Up Wallet
        </button> */}


        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Your current Wallet Balance is ${userInfo.wallet}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <Topup/>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose} className="closebtn">Close</button>
          </Modal.Footer>
        </Modal>

        {/* <Topup /> */}
      </div>
    </>
  );
}
