import EventUpdates from "./EventUpdates";
import WelcomeButton from "../../components/WelcomeButton";
import CreateEvent from './CreateEvent'
import Navbar from "../../components/Navbar";

export default function Events(){
    return(
        <>
        <Navbar/>
        <WelcomeButton loc="events"/>
        <h1>Here are a few events to look out for:</h1>
        <CreateEvent/>
        <EventUpdates/> 
        </>
        
    )
}