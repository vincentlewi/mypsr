import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './contexts/AuthContext';

export default function NavbarDoang(props) {
  const { user } = useAuth()
  // const profile
  const navigate = useNavigate()
  return (
      <Navbar bg="light" expand="lg" sticky="top" style={{zIndex:'100'}}>
        <Container fluid>
          <Navbar.Brand onClick={() => {navigate("/mypsr/home")}} style={{margin: "0px 10px 5px 4px", padding: "0 0 2px 0", cursor: 'pointer'}}><img src={require('../assets/logoblack.png')} height="30" alt='logo'/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link className={'nav-link'} id='laundryLink' onClick={() => {navigate("/mypsr/laundry")}}>Laundry</Nav.Link>
              <Nav.Link className={'nav-link'} id='eventsLink' onClick={() => {navigate("/mypsr/events")}}>Events</Nav.Link>
              <Nav.Link className={'nav-link'} id='maintenaceLink' onClick={() => {navigate("/mypsr/services")}}>Services</Nav.Link>
            </Nav>
            <Link to='/mypsr/profile' style={{textDecoration:'none'}}>
              <img className='profile' src={user.photoURL} height='40' alt="profilepic"/>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}