import ComplaintCard from "./ComplaintCard";
import WelcomeButton from "../../components/WelcomeButton";
import GuestCard from "./GuestCard";
import GuestFormPopup from "./GuestFormPopup";
import ComplaintPopup from "./ComplaintPopup";
import Navbar from "../../components/Navbar";

export default function Services(){
    return(
        <>
        <Navbar/>
        <WelcomeButton loc="services"/>
        <h1>Your recent reports:</h1>
        <ComplaintPopup/>
        <ComplaintCard/>
        <ComplaintCard/>
        <ComplaintCard/>
        <ComplaintCard/>
        <ComplaintCard/>
        <hr/>
        <button className="px-4 py-1 text-sm text-blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">Favorites</button>
        <GuestFormPopup/>
        <GuestCard/>
        <GuestCard/>
        <GuestCard/>
        <GuestCard/>
        </>
        
    )
}