import React, { useContext, useState } from 'react'
import {signOut} from "firebase/auth"
import { db, auth } from "../../../components/firebase"
import { useAuth } from '../../../components/contexts/AuthContext'
import { useEffect } from 'react'
import { getDoc } from 'firebase/firestore'

const Navbar = () => {
  const {user} = useAuth()
  const [userdata, setuserdata] = useState()
  
  // useEffect(()=>{
  //   setuserdata(getuserdata())
  // }, [])

  // async function getuserdata(){
  //   const userdata = await getDoc(db,"users", user.uid)
  //   return userdata
  // }
  console.log(user)
  return (
    <div className='navbar'>
      <span className="logo">MyPSR</span>
      <div className="user">
      {/* the pic needs to make a login page */}
        <img src={user.photoURL} alt="" />  
        <span>{user.displayName}</span>
        <button onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar