import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { db } from "../../components/firebase"
import { getDoc, doc, arrayUnion, updateDoc, arrayRemove } from "firebase/firestore"
import { useAuth } from "../../components/contexts/AuthContext"

export default function LaundryCard(props) {
    const fstring = props.type.charAt(0).toUpperCase() + props.type.slice(1);
    return (
        <>
            <div className="column">
                <div className="card" id={props.id}>
                    <h4 className="title"><b>{fstring}</b></h4>
                    <hr />
                    <p>Date: {props.date}</p>
                    <p>Time: {props.timing}</p>
                    <p>Machine: {props.machine}</p>
                </div>
            </div>
           
        </>

    )
}
