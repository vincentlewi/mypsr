import Navbar from '../../components/Navbar';
import EventUpdates from '../Events/EventUpdates'
import WelcomeButton from '../../components/WelcomeButton'
import { auth, db } from '../../components/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from "react-router-dom"
import { useIsPresent } from "framer-motion";
import PageTransition from '../../components/PageTransition'
import './Home.css'


export default function Home(){
    const isPresent = useIsPresent()

    const navigate = useNavigate()
    function logout(){
        signOut(auth)
        navigate('/')
    }
    return(
        <div className='Home'>
            <PageTransition animated={true} isPresent={isPresent}/>
            <Navbar/>
            <WelcomeButton loc="home"/>
            <button className = "btn btn-danger" onClick={logout}>LOG OUT</button>
            <h2>Recent updates for you</h2>
            <EventUpdates/>
        </div>
    )
}
