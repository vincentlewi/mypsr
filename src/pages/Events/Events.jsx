import EventUpdates from "./EventUpdates";
import WelcomeButton from "../../components/WelcomeButton";
import CreateEvent from './CreateEvent'
import Navbar from "../../components/Navbar";
import './events.css'
import { Row, Col, Container } from 'react-bootstrap';

export default function Events(){
    return(
        <>
        <Navbar/>
        <div className="container">
            <WelcomeButton loc="events"/>
            <div className="events-header">
                <Container>
                    <Row>
                        <Col lg="9" md="9" sm="12">
                        <h3>Here are a few events to look out for:</h3>
                        </Col>
                        <Col lg="3" md="3" sm="12" className="create">
                        <CreateEvent/>
                        </Col>
                    </Row>
                </Container>
                
                
            </div>
            <EventUpdates/> 
        </div>
        </>
        
    )
}