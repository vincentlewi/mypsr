import EventUpdates from "./EventUpdates";
import WelcomeButton from "../../components/WelcomeButton";
import CreateEvent from './CreateEvent'

export default function Events(){
    return(
        <>
        <WelcomeButton loc="events"/>
        <h1>Here are a few events to look out for:</h1>
        <CreateEvent/>
        <EventUpdates/> 
        </>
        
    )
}