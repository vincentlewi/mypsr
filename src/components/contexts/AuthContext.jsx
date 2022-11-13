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

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [currentUserData, setCurrentUserData] = useState()

    async function signup(email, password, fullname, address) {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((cred) => {
                    setDoc(doc(db, 'users', cred.user.uid), {
                        uid: cred.user.uid,
                        name: fullname,
                        displayName: fullname,
                        events: [],
                        complaints: [],
                        wallet: 0,
                        address: address,
                        photoURL: 'https://firebasestorage.googleapis.com/v0/b/mypsr-backup.appspot.com/o/defaultProfile.jpg?alt=media&token=c573eed3-2637-4e95-b304-5d33e5d82736'
                    })
                    setDoc(doc(db, "userChats", cred.user.uid), {})
                    updateProfile(auth.currentUser, {
                        displayName: fullname,
                        photoURL: 'https://firebasestorage.googleapis.com/v0/b/mypsr-backup.appspot.com/o/defaultProfile.jpg?alt=media&token=c573eed3-2637-4e95-b304-5d33e5d82736'
                    })
                    setUser(auth.currentUser)
                })
            return ''
        } catch (e) {
            return e.message
        }
    }

    // function getUserData(user){
    //     onSnapshot(doc(db, "users", user.uid), (doc)=>{
    //         setCurrentUserData(doc.data())
    //     })
    // }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false)
            setUser(currentUser)
        })
        return unsubscribe
    }, [])


    const value = {
        user,
        login,
        signup,
        currentUserData
    }

    return (
        <AuthContext.Provider value={value}>
            {/* { children } */}
            {!loading && children}
        </AuthContext.Provider>
    )
}