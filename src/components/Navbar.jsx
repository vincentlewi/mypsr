import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './contexts/AuthContext';
import { useState } from 'react';
import './Navbar.css'

export default function NavbarDoang(props) {
  const { user } = useAuth()
  const [show, setShow] = useState(false);
  const showDropdown = (e)=>{
      setShow(!show);
  }
  const hideDropdown = e => {
      setShow(false);
  }
  const navigate = useNavigate()
  return (
      <Navbar className='navbar' bg="light" expand="lg" sticky="top" style={{zIndex:'100'}}>
        <Container fluid>
          <Navbar.Brand onClick={() => {navigate("/home")}} style={{margin: "0px 10px 5px 4px", padding: "0 0 2px 0", cursor: 'pointer'}}><img src={require('../assets/logoblack.png')} height="30" alt='logo'/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link className={'nav-link'} id='laundryLink' onClick={() => {navigate("/laundry")}}>Laundry</Nav.Link>
              <Nav.Link className={'nav-link'} id='eventsLink' onClick={() => {navigate("/events")}}>Events</Nav.Link>
              {/* <Nav.Link className={'nav-link'} id='servicesLink' onClick={() => {navigate("/services")}}>Services</Nav.Link> */}
              <NavDropdown title="Services" id="basic-nav-dropdown" className='bg-light  border-0' style={{border: 'none'}} onMouseOver = {console.log()} show={show} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                  <NavDropdown.Item className={'nav-link border-0'} id='maintenanceLink' onClick={() => {navigate("/maintenance")}}>
                    Maintenance Report
                  </NavDropdown.Item>
                  <NavDropdown.Item className={'nav-link border-0'} id='gRegisterLink' onClick={() => {navigate("/guestregistration")}}>
                    Guest Registration
                  </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className={'nav-link'} id='chatsLink' onClick={() => {navigate("/chats")}}>Chats</Nav.Link>
            </Nav>
            <Link to='/profile' style={{textDecoration:'none'}}>
              <p className='nav-link d-inline text-black-50'>Profile</p>
              {document.documentElement.clientWidth >= 992 && <img className='profile' src={user.photoURL} alt="profilepic"/>}
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}