import EventUpdates from "./EventUpdates";
import WelcomeButton from "../../components/WelcomeButton";
import CreateEvent from './CreateEvent'
import Navbar from "../../components/Navbar";
import './events.css'

export default function Events(){
    return(
        <>
        <Navbar/>
        <div className="container">
            <WelcomeButton loc="events"/>
            <div className="events-header">
                <h1>Here are a few events to look out for:</h1>
                <CreateEvent/>
            </div>
            <EventUpdates/> 
        </div>
        </>
        
    )
}