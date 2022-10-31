import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function NavbarPreLogin(props) {

  const html = document.documentElement

  const [isActive, setIsActive] = useState([false, false, false, false])

  useEffect(() => {
    window.addEventListener('scroll', scrollProgress)
  })

  function scrollProgress() {
    const scrollPx = html.scrollTop + 200
    const vh = html.clientHeight - 56
    setIsActive([
      2*vh <= scrollPx & scrollPx < 3*vh ? true:false, 
      3*vh <= scrollPx & scrollPx < 4*vh ? true:false, 
      4*vh <= scrollPx & scrollPx < 5*vh ? true:false,
      5*vh <= scrollPx? true:false
    ])
  }
  
  return (
      <Navbar bg="light" expand="lg" fixed="top" style={{zIndex:'100'}}>
        <Container fluid>
          <Navbar.Brand href="#home" style={{margin: "0px 10px 5px 4px", padding: "0 0 2px 0"}}><img src={require('../assets/logoblack.png')} height="30" alt='logo'/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link className={`nav-link ${isActive[0] ? 'active':''}`} id='laundryLink' href="#laundry">Laundry</Nav.Link>
              <Nav.Link className={`nav-link ${isActive[1] ? 'active':''}`} id='eventsLink' href="#events">Events</Nav.Link>
              <Nav.Link className={`nav-link ${isActive[2] ? 'active':''}`} id='chatsLink' href="#chats">Chats</Nav.Link>
              <Nav.Link className={`nav-link ${isActive[3] ? 'active':''}`} id='maintenaceLink' href="#maintenance">Maintenance</Nav.Link>
            </Nav>
            <Link to='login' state={1} style={{textDecoration:'none'}}>
              <Button variant="outline-success" className="d-grid gap-2">Login</Button>{' '}
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}