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
                <h1>Maintenance</h1>
                <Container className="mb-2">
                    <Row>
                        <Col lg={4} md={4} sm={12}>
                        <h3>Requested</h3>
                        </Col>
                        <Col lg={8} md={8} sm={12} className="reportcomp">
                        <ComplaintPopup />
                        </Col>
                    </Row>
                </Container>
                
                <div className="Requested">
                    <Container>
                        <Row>
                            <Col lg={4} md={6} sm={6} className="mb-3">
                            <Card className="requested">
                                <Card.Body>
                                    <Card.Title>Air Conditioner Service</Card.Title>
                                    <Card.Subtitle className="mb-2 date">18 Sep 2022</Card.Subtitle>
                                    <Card.Text className="comment">AC not cold although I put 18C</Card.Text>
                                    <Card.Subtitle className="status text-warning">Maintainence requested</Card.Subtitle>
                                </Card.Body>
                            </Card>
                            </Col>
                            
                            <Col lg={4} md={6} sm={6} className="mb-3">
                            <Card className="requested">
                                <Card.Body>
                                    <Card.Title>Air Conditioner Service</Card.Title>
                                    <Card.Subtitle className="mb-2 date">18 Sep 2022</Card.Subtitle>
                                    <Card.Text className="comment">AC not cold although I put 18C</Card.Text>
                                    <Card.Subtitle className="text-warning">Maintainence requested</Card.Subtitle>
                                </Card.Body>
                            </Card>
                            </Col>
                            <Col lg={4} md={6} sm={6} className="mb-3">
                            <Card className="requested">
                                <Card.Body>
                                    <Card.Title>Air Conditioner Service</Card.Title>
                                    <Card.Subtitle className="mb-2 date">18 Sep 2022</Card.Subtitle>
                                    <Card.Text className="comment">AC not cold although I put 18C</Card.Text>
                                    <Card.Subtitle className="text-warning">Maintainence requested</Card.Subtitle>
                                </Card.Body>
                            </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="Completed">
                    <Container><h3 className="mb-3">Completed</h3></Container>
                    
                    <Container>
                        <Row>
                            <Col lg={4} md={6} sm={6} className="mb-3">
                            <Card className="completed">
                                <Card.Body>
                                    <Card.Title>Air Conditioner Service</Card.Title>
                                    <Card.Subtitle className="mb-2 date">18 Sep 2022</Card.Subtitle>
                                    <Card.Text className="comment">AC not cold although I put 18C</Card.Text>
                                    <Card.Subtitle className="status">Maintainence completed</Card.Subtitle>
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