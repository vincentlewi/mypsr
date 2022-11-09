import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { auth, db } from '../firebase'
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'


const AuthContext = React.createContext()

export function useAuth(){ 
    return useContext(AuthContext)
}


export function AuthProvider( {children} ){ 
    const [user, setUser]  = useState()
    const [loading, setLoading] = useState(true)
    const [currentUserData, setCurrentUserData] = useState()

    async function signup(email, password, fullname, address){
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            .then((cred) =>{
                setDoc(doc(db, 'users', cred.user.uid),{
                    name: fullname,
                    events: [],
                    complaints: [],
                    wallet: 0,
                    address: address
                })
                updateProfile(auth.currentUser, {
                    photoURL: 'https://firebasestorage.googleapis.com/v0/b/mypsr-backup.appspot.com/o/DefaultPhoto.jpg?alt=media&token=561406c4-1f82-409f-9a12-cafcad7baac9'
                })
                setUser(auth.currentUser)
            })
            return ''
        } catch(e){
            return e.message
        }
    }

    // function getUserData(user){
    //     onSnapshot(doc(db, "users", user.uid), (doc)=>{
    //         setCurrentUserData(doc.data())
    //     })
    // }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser){
                setUser(currentUser)
            }
            setLoading(false)
        })
        return unsubscribe
    }, [])
   

    const value = {
        user,
        login,
        signup,
        currentUserData
    }

    return(
        <AuthContext.Provider value = {value}>
            {/* { children } */}
            {!loading && children}
        </AuthContext.Provider>
    )
}