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
import { collection, getDocs, query, where, addDoc, onSnapshot, updateDoc, increment } from "firebase/firestore";

export default function Profile() {
  console.log("RENDERING MY ASS")
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



  //add user wallet number?
  async function topUpWallet(uid){
    const paymentRef = collection(db, `users/${uid}/payments`);
    const docs = await getDocs(paymentRef, where("status", "==", "succeeded"))
    const results = docs.docs
    results.map((res) => {
        const amountToBeAdded = (res.data().amount)/100
        updateDoc(doc(db, `users`, user.uid), {
            wallet: increment(amountToBeAdded)
        })

        updateDoc(doc(db, `users/${uid}/payments/`, res.id), {
            amount : 0,
        })
        console.log("end of update")
    })
}


useEffect(() => {
  getUserData();
}, []);


  topUpWallet(user.uid)
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
        <h1>ini profile</h1>
        <h3>name: {userInfo.name}</h3>
        <h3>Profile Picture: </h3>
        <img className="pp" src={userInfo.photo} alt="profile" />
        <br />
        <button onClick={() => setShow(true)}>Change profile picture</button>
        <h3>email: {userInfo.email}</h3>
        <h3>school: {userInfo.school}</h3>
        <h3>year: {userInfo.year}</h3>
        <h3>address: {userInfo.address}</h3>
        <h3>wallet: {userInfo.wallet}</h3>
        <button className="cancelbtn" onClick={logout}>
          LOG OUT
        </button>






        <button className="createbtn" onClick={handleShow}>
          Top Up Wallet
        </button>


        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Your current Wallet Balance is ${userInfo.wallet}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                Choose the amount you want!
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
