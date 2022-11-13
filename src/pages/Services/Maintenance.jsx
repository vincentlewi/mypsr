import WelcomeButton from "../../components/WelcomeButton";
import ComplaintPopup from "./ComplaintPopup";
import ComplaintUpdates from "./ComplaintUpdates";
import Navbar from '../../components/Navbar'
import '../../components/card.css'
import { Row, Col, Container } from 'react-bootstrap';
import './services.css';

export default function Maintenance(){
    console.log("Rendering Maintenance.jsx")
    return (
        <>
            <Navbar/>
                <div className="container">
                    <WelcomeButton loc="services" />
                    <div className="maintenance">
                        <h1>Maintenance</h1>
                        <Container className="mb-2">
                            <Row>
                                <Col lg={8} md={8} sm={12} className="subttl">
                                    <h5>Check your recent reports here:</h5>
                                </Col>
                                <Col lg={4} md={4} sm={12} className="reportcomp">
                                    <ComplaintPopup />
                                </Col>
                            </Row>
                        </Container>
                        <div className="Requested">
                            <ComplaintUpdates/>
                        </div>
                    </div>
                </div>
        </>
    )
}