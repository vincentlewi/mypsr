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
import CardHeader from "react-bootstrap/esm/CardHeader";

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

            <div className="guestregistration">
            
                {/* header */}
                <h1>Guest Registration</h1>
                <Container className="mb-2">
                    <Row>
                        <Col lg={4} md={4} sm={12}>
                        <h5>Your guests coming over:</h5>
                        </Col>
                        <Col lg={8} md={8} sm={12} className="reportcomp">
                        <GuestFormPopup />
                        </Col>
                    </Row>
                </Container>

                <div className="Register">
                    <Container>
                        <Row>
                            <Col lg={4} md={6} sm={6} className="mb-3" >
                            <Card style={{border:'none'}} className="guestpart bg-light">
                                <Card.Body>
                                <Card.Title>Emily Aurelia</Card.Title>
                                <Card.Subtitle className="mb-2 date">18 Sep 2022, 05:00AM</Card.Subtitle>
                                <Card.Text>Project Work</Card.Text>
                                <Card.Subtitle><button onClick="" className="cancelbtn cancel">Cancel</button></Card.Subtitle>
                                </Card.Body>
                            </Card>
                            </Col>
                        </Row>
                    </Container>
                    
                </div>
                <div className="Favourite">
                    <h1>Favourites</h1>
                    <Container>
                        <Row>
                            <Col lg={4} md={6} sm={6} className="mb-3 guestpart" >
                                <Row>
                                    <Col lg={9} md={9} sm={9}>
                                    <span><h5 className='mb-0'>Vitto Surya Tedja</h5></span>
                                    </Col>
                                    <Col className="reportcomp" lg={3} md={3} sm={3}>
                                    <img src={require("../../assets/closes.png")} width="20px" onClick=""/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="History">
                    <h1>History</h1>
                    <Container>
                        <Row>
                            <Col lg={4} md={6} sm={6} className="mb-3" >
                            <Card style={{border:'none'}} className="guestpart bg-light">
                                <Card.Body>
                                <Card.Title>Emily Aurelia</Card.Title>
                                <Card.Subtitle className="mb-2 date">18 Sep 2022, 05:00AM</Card.Subtitle>
                                <Card.Text>Project Work</Card.Text>
                                <Card.Subtitle><button onClick="" className="createbtn rereg">Re-Register</button></Card.Subtitle>
                                </Card.Body>
                            </Card>
                            </Col>
                        </Row>
                    </Container>
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