import { useState } from "react";
import  Modal  from 'react-bootstrap/Modal';

export default function OrderSummary(props){
    const [show, setShow] = useState(false);
    const [walletBalance, setWalletBalance] = useState(10);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handlePayment = () => {
        setWalletBalance(walletBalance - 3)
        handleClose()
    }

    let laundry = props.laundrySlot
    let dryer = props.dryerSlot
    let total = 0

    if(laundry !== ''){
        total += 2
    }
    if(dryer !== ''){
        total += 1
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
                    <td>Laundry - Machine {laundry.slice(-1)} </td>
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
    </div>




    <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Payment Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You are about to pay $3.00 for:</p>
                <table>
                    <tr>
                        <td>Laundry</td>
                        <td>Machine 3</td>
                        <td>at</td>
                        <td>20:00</td>
                    </tr>
                    <tr>
                        <td>Dryer</td>
                        <td>Machine 2</td>
                        <td>at</td>
                        <td>21:00</td>
                    </tr>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <button className = "closebtn" onClick={handleClose}>
                    Close
                </button>
                <button
                className = "cancelbtn"
                onClick={() =>{ 
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