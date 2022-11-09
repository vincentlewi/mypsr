import WelcomeButton from "../../components/WelcomeButton";
import GuestFormPopup from "./GuestFormPopup";
import ComplaintPopup from "./ComplaintPopup";
import ComplaintUpdates from "./ComplaintUpdates";
import GuestRegistrationUpdates from "./GuestRegistrationUpdates";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./tabs.css"
import FavouriteGuestsUpdates from "./FavouriteGuestsUpdates"
import Navbar from '../../components/Navbar'
import '../../components/card.css'

export default function Services() {
    console.log("Rendering Services.jsx")
    return (
        <>
            <Navbar/>
            <div className="container">
            <WelcomeButton loc="services" />
            <h1>Your recent reports:</h1>
            <ComplaintPopup />
            <ComplaintUpdates />
                <Tabs className="Tabs">
                    <TabList>
                        <Tab>Register Favourite Guests </Tab>
                        <Tab>Registered Guest History</Tab>
                        <Tab>Register a Guest here</Tab>
                    </TabList>
                    <TabPanel>
                        <p>Favourite Guests go here</p>
                        <FavouriteGuestsUpdates />
                    </TabPanel>
                    <TabPanel>
                        <GuestRegistrationUpdates />
                    </TabPanel>
                    <TabPanel>
                        <GuestFormPopup />
                    </TabPanel>
                </Tabs>
            </div>
            
        </>

    )
}