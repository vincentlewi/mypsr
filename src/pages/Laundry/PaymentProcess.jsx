import { useState } from "react";
import  Modal  from 'react-bootstrap/Modal';

export default function PaymentProcess(){
    const [show, setShow] = useState(false);
    const [walletBalance, setWalletBalance] = useState(10);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handlePayment = () => {
        setWalletBalance(walletBalance - 3)
        handleClose()
    }

    return(
    <>
        <div className="payment-button-area">
            <span></span>
            <button onClick={handleShow} className="laundrybtn">
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
    </>)
}