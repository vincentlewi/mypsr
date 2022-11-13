import WelcomeButton from "../../components/WelcomeButton";
import GuestFormPopup from "./GuestFormPopup";
import GuestRegistrationUpdates from "./GuestRegistrationUpdates";
import "./tabs.css"
import FavouriteGuestsUpdates from "./FavouriteGuestsUpdates"
import Navbar from '../../components/Navbar'
import '../../components/card.css'
import { Row, Col, Container } from 'react-bootstrap';
import './services.css';

export default function GuestRegistration() {
    console.log("Rendering Services.jsx")
    return (
        <>
          <Navbar/>
            <div className="container">
                <WelcomeButton loc="services" />

                <div className="guestregistration">
                
                    {/* header */}
                    <h1>Guest Registration</h1>
                    <Container className="mb-2">
                        <Row>
                            <Col lg={9} md={7} sm={12} className="subttl">
                            <h5>Your guests coming over:</h5>
                            </Col>
                            <Col lg={3} md={5} sm={12} className="reportcomp">
                            <GuestFormPopup />
                            </Col>
                        </Row>
                    </Container>

                    <div className="Register">
                        <Container>
                            <GuestRegistrationUpdates/>
                        </Container>
                        
                    </div>
                    <div className="Favourite">
                        <h1>Favourites</h1>
                        <Container>
                            <FavouriteGuestsUpdates/>
                        </Container>
                    </div>
                </div>
            </div>  
        </>

    )
}