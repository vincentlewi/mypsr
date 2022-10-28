import GuestCard from "./GuestCard";
import GuestForm from "./GuestForm";

export default function GuestRegistration(){
    return(
        <>
            <h2>Recently registered guests</h2>
            <button className="btn btn-secondary">Favorites</button>
            <button className="btn btn-warning">Add New Guest</button>

            <GuestCard/>
            <GuestCard/>
            <GuestCard/>
            <GuestCard/>
            
            <GuestForm/>
        </>
    )   
}