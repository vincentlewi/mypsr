import Button from 'react-bootstrap/Button';
import { db } from './firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../components/contexts/AuthContext'
import { useState, useEffect } from 'react';

export default function WelcomeButton(props){
    const { user } = useAuth()
    let [username, setUsername] = useState("")
    const userRef = doc(db, "users", user.uid)
    
    async function getUserData(){
        const userDoc = await getDoc(userRef)
        setUsername(userDoc.data().name)
    }

    useEffect(() => {
        getUserData()
    }, [])

    let today = new Date(); 

    let notes = {
        home: "Let's keep you updated with everything PSR related",
        laundry: "Time to clean your clothes",
        events: "Jangan ansos lagi ya!",
        services: "What problem do you bring today?"
    }


    function getTiming(){
        let time = "";
        if(today.getHours() < 12){
            time = "Good Morning"
        }
        else if (today.getHours() > 12 && today.getHours() < 17){
            time = "Good Afternoon"
        }
        else if (today.getHours() >= 17){
            time = "Good Evening"
        }
        else{
            time = "~This is your lunch time~"
        }
        return time;
    }
    
    return (
        <div className="WelcomeButton">
            <div className="welcome-img">
                <img src={require("../assets/logoblack.png")} alt="" />
            </div>
            <div className="welcome_msg">
                <h3><span className = "header"><b>{getTiming()}, {username}</b></span></h3>
                <h3 className = "subheader py-2">{notes[props.loc]}</h3>
            </div>  
        </div>
    );
}

