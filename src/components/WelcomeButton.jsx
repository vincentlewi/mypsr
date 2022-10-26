import Button from 'react-bootstrap/Button';
import { db } from './firebase'
import { setDoc, doc, onSnapshot, getDoc } from 'firebase/firestore'
import { useAuth } from '../components/contexts/AuthContext'
import { useState } from 'react';

export default function WelcomeButton(props){
    const { user } = useAuth()
    let [username, setUsername] = useState("")
    const userRef = doc(db, "users", user.uid)
    
    async function getUserData(){
        const userDoc = await getDoc(userRef)
        console.log(userDoc.data())
        setUsername(userDoc.data().name)
        console.log("username is set")
    }

    getUserData()

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
    
    
    function getProfileButton(){
        if(props.loc === "home"){
            return(
                    <div className="profile-btn">
                        <Button variant="danger">
                            Go To My Profile
                        </Button>
                    </div>
            )
        }
    }
    
    return (
        <div className="WelcomeButton">
            <div className="welcome-img">
                <img src={require("../assets/logoblack.png")} alt="" />
            </div>
            <div className="welcome_msg">
                <h3><span className = "header"><b>{getTiming()}, {username}</b></span></h3>
                <h3 className = "subheader py-2">{notes[props.loc]}</h3>
                {getProfileButton()}
            </div>  
        </div>
    );
}

