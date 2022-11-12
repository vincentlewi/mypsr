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
import { Row, Col, Container, Card } from 'react-bootstrap';
import './services.css';

export default function Services() {
    console.log("Rendering Services.jsx")
    return (
        <>
            <Navbar/>
            <div className="container">
            <WelcomeButton loc="services" />
            

            <div className="maintenance">
                {/* header */}
                <h1>Maintenance</h1>
                <Container className="mb-2">
                    <Row>
                        <Col lg={4} md={4} sm={12}>
                        <h5>Check your recent reports here:</h5>
                        </Col>
                        <Col lg={8} md={8} sm={12} className="reportcomp">
                        <ComplaintPopup />
                        </Col>
                    </Row>
                </Container>

                <div className="Requested">
                    <ComplaintUpdates/>
                </div>
            </div>



            {/* <h1>Your recent reports:</h1>
            <ComplaintPopup />
            <ComplaintUpdates /> */}
                <Tabs className="Tabs">
                    <TabList>
                        <Tab>Register Favourite Guests </Tab>
                        <Tab>Registered Guest History</Tab>
                        <Tab>Register a Guest here</Tab>
                    </TabList>
                    <TabPanel>
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