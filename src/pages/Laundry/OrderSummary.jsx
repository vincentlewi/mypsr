import { useState, useEffect } from "react";
import  Modal  from 'react-bootstrap/Modal';
import { useAuth } from "../../components/contexts/AuthContext";
import { doc, getDoc, updateDoc, increment, collection, addDoc } from 'firebase/firestore'
import { db } from '../../components/firebase'
import { useNavigate } from "react-router-dom";
import Topup from '../Profile/Topup'

export default function OrderSummary(props){
    const [show, setShow] = useState(false);
    const [walletBalance, setWalletBalance] = useState(10);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleTopUp = () => navigate("/mypsr/profile")
    const navigate = useNavigate()
    const { user } = useAuth()
    const userRef = doc(db, "users", user.uid);

    async function getWalletData(){
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        setWalletBalance(userData.wallet)
    }

    useEffect(() => {
        getWalletData()
    },[])


    let laundry = props.laundrySlot
    let dryer = props.dryerSlot
    let total = 0

    if(laundry !== ''){
        total += 2
    }
    if(dryer !== ''){
        total += 1
    }

    async function handlePayment(){
        setWalletBalance(walletBalance - total)
        await updateDoc(userRef, {
            wallet: increment(-total)
        })
        navigate('/mypsr/home')
    }

    async function addLaundryBookingSlot(){
        const laundryRef = doc(db, "laundry", props.dateID)
        await updateDoc(laundryRef, {
            [`${props.laundryTimeSlot}.${props.laundrySlot}`]: [user.displayName]
        })
        const laundryEventsRef = collection(db, "laundryEvents")
        await addDoc(laundryEventsRef, {
            date: props.dateID,
            machine: props.laundrySlot,
            participant: user.displayName,
            timing: props.laundryTimeSlot,
            type: "washer",
            transactionDate: new Date().toGMTString(),
            status: "Booked"
        })
    } 

    async function addDryerBookingSlot(){
        const dryerRef = doc(db, "dryer", props.dateID)
        await updateDoc(dryerRef, {
            [`${props.dryerTimeSlot}.${props.dryerSlot}`]: [user.displayName]
        })
        const laundryEventsRef = collection(db, "laundryEvents")
        await addDoc(laundryEventsRef, {
            date: props.dateID,
            machine: props.dryerSlot,
            participant: user.displayName,
            timing: props.dryerTimeSlot,
            type: "dryer",
            transactionDate: new Date().toGMTString(),
            status: "Booked"
        })
        
    }  


    
    return(
        <div className="payment-area">
        <div>
            <h3>Order Summary</h3>
            <table className="ordersummary-table">
                <tr>
                   <td colSpan={2}>Services</td>
                   <td className = "price">Prices</td>
                </tr>
                {laundry?
                <tr>
                    <td>Washer - Machine {laundry.slice(-1)} </td>
                    <td>at {props.laundryTimeSlot}</td>
                    <td className = "price">$2.00</td>
                </tr>:null}
                {dryer?
                <tr>
                    <td>Dryer - Machine {dryer.slice(-1)}</td>
                    <td>at {props.dryerTimeSlot}</td>
                    <td className = "price">$1.00</td>
                </tr>:null}
                
                {total > 0 ? <tr>
                    <th colSpan={2}>Total Amount</th>
                    <th className = "price">${total}.00</th>
                </tr>: null}
            </table>
        </div>
    <div className="payment-button-area">
        <button onClick={handleShow} className={total < walletBalance?"laundrybtn": "disabledbtn"} disabled={total > walletBalance}>
            <span>Your PSRwallet Balance is ${walletBalance}</span>
            <br/>
            <span>Pay NOW</span>
        </button>
        {total > walletBalance ?
                    <>
                        <br/>
                        <button onClick={handleTopUp} className={"laundrybtn"}>
                            <p>Insufficient Balance</p>
                            <span>Please Top Up now</span>
                        </button>
                    </> : null}
    </div>

    <Modal
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Payment Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You are about to pay ${total}.00 for:</p>
                <table>
                    {laundry?
                        <tr>
                            <td>Washer - Machine {laundry.slice(-1)} </td>
                            <td>at {props.laundryTimeSlot}</td>
                            <td className = "price">at $2.00</td>
                        </tr>:null}
                    {dryer?
                        <tr>
                            <td>Dryer - Machine {dryer.slice(-1)}</td>
                            <td>at {props.dryerTimeSlot}</td>
                            <td className = "price">at $1.00</td>
                        </tr>:null}
                </table>
            </Modal.Body>
            <Modal.Footer>
                <button className = "closebtn" onClick={handleClose}>
                    Close
                </button>
                <button
                className = "cancelbtn"
                onClick={() =>{ 
                    dryer && addDryerBookingSlot()
                    laundry && addLaundryBookingSlot()
                    handlePayment()
                }}
                >
                    Pay
                </button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}