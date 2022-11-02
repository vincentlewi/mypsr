import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { auth, db } from '../firebase'
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged
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
                console.log("from use effect", auth.currentUser)
                setUser(currentUser)
                console.log(user)
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