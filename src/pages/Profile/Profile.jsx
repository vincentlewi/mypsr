import './profile.css'
import { db } from '../../components/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../../components/contexts/AuthContext'
import { useState } from 'react';
import Navbar from '../../components/Navbar'
import { useEffect } from 'react';

export default function Profile() {
    const { user } = useAuth()
    let [userInfo, setUserInfo] = useState({})
    const userRef = doc(db, "users", user.uid)

    const schoolNames = {
        scis: 'School of Computing and Information Systems',
        sob: 'School of Business'
    }
    
    async function getUserData(){
        const userDoc = await getDoc(userRef)
        const userData = userDoc.data()
        setUserInfo({
            name: userData.name,
            email: user.email,
            school: schoolNames[user.email.split("@")[1].split(".")[0]],
            block: userData.address.block,
            floor: userData.address.floor,
            room: userData.address.room,
            wallet: userData.wallet
        })
        console.log(user.email)
    }
    useEffect(() => {
        getUserData()
    }, [])
    
    return(

        <div className='profile'>
            <Navbar/>
            <h1>ini profile</h1>
            <h3>name: {userInfo.name}</h3>
            <h3>email: {userInfo.email}</h3>
            <h3>school: {userInfo.school}</h3>
            <h3>block: {userInfo.block}</h3>
            <h3>floor: {userInfo.floor}</h3>
            <h3>room: {userInfo.room}</h3>
            <h3>wallet: {userInfo.wallet}</h3>
        </div>
    )
}