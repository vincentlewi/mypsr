import React from 'react';
import {db} from '../../components/firebase'
import {doc, updateDoc, arrayUnion, getDoc} from 'firebase/firestore'
import { useAuth } from "../../components/contexts/AuthContext"

export default function AddToFavourites(props) {

  console.log("Rendering AddToFavourites.jsx")

  const { user } = useAuth()

  async function handleAdd() {
    const visitRef = doc(db, "guestVisit", props.id)
    const visitDoc = await getDoc(visitRef)
    const guestRef = visitDoc.data().guestFirebaseRef
    await updateDoc(doc(db, "guests", guestRef), {
      favouritedBy: arrayUnion(user.uid)
    })
  }

  return (
    <>
      <button className = "createbtn" onClick={handleAdd}>
          Add Guest to Favorites
      </button>
    </>
  );
}