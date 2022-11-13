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
        <div className="container events">
            <WelcomeButton loc="events"/>
            <div className="events-header">
                <Container>
                    <Row>
                        <Col lg="10" md="10" sm="12">
                        <h5>Here are a few events to look out for:</h5>
                        </Col>
                        <Col lg="2" md="2" sm="12" className="create">
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