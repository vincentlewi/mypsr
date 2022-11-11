import './profile.css'
import { db } from '../../components/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { auth } from '../../components/firebase'
import { useAuth } from '../../components/contexts/AuthContext'
import { useState } from 'react';
import Navbar from '../../components/Navbar'
import { useEffect } from 'react';
import { useNavigate } from 'react-router'
import PhotoCropper from './PhotoCropper';
import Topup from './Topup'

export default function Profile() {
    const navigate = useNavigate()
    const { user } = useAuth()
    // const useruser = useUser()
    // console.log(() => useUser())
    function logout(){
        signOut(auth)
        navigate('/mypsr')
    }

    // getting user data from firestore
    const userRef = doc(db, "users", user.uid)
    const date = new Date()
    let [userInfo, setUserInfo] = useState({})
    const schoolNames = {
        scis: 'School of Computing and Information Systems',
        business: 'School of Business',
        economics: 'School of Economics',
        accountancy: 'School of Accountancy',
        socsc: 'School of Social Sciences',
        law: 'School of Law'
    }
    
    async function getUserData(){
        const userDoc = await getDoc(userRef)
        const userData = userDoc.data()
        setUserInfo({
            name: userData.name,
            photo: user.photoURL,
            email: user.email,
            school: schoolNames[user.email.split("@")[1].split(".")[0]],
            year: date.getFullYear() - parseInt(user.email.split("@")[0].slice(-4)) + 1,
            address: userData.address,
            wallet: userData.wallet
        })
    }
    useEffect(() => {
        getUserData()
    }, [])
    
    const [show, setShow] = useState(false)
    return(
        <>
        <div className='profile'>
            <Navbar/>
            <PhotoCropper 
                key={show} 
                show={show} 
                setUserInfo={setUserInfo} 
                setShow={setShow}
            />
            <h1>ini profile</h1>
            <h3>name: {userInfo.name}</h3>
            <h3>Profile Picture: </h3><img className='pp' src={userInfo.photo}/><br/>
            <button onClick={() => setShow(true)}>Change profile picture</button>
            <h3>email: {userInfo.email}</h3>
            <h3>school: {userInfo.school}</h3>
            <h3>year: {userInfo.year}</h3>
            <h3>address: {userInfo.address}</h3>
            <h3>wallet: {userInfo.wallet}</h3>
            <button className = "cancelbtn" onClick={logout}>LOG OUT</button>
            <Topup/>
        </div>
    )
}