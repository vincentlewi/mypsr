import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';

function NavbarPreLogin() {
  const html = document.documentElement

  const [isActive, setIsActive] = useState([false, false, false, false])
  
  useEffect(() => {
    window.addEventListener('scroll', scrollProgress)
    return () => window.removeEventListener('scroll', scrollProgress)
  })

  const scrollProgress = () => {
    const scrollPx = html.scrollTop
    const winHeightPx = document.getElementsByClassName('App-header')[0].scrollHeight - html.clientHeight
    const scrollLen = scrollPx / winHeightPx * 100
    
    console.log(scrollPx)
    if (scrollPx < 1644) {
      setIsActive([false, false, false, false])
    } else if (scrollPx < 2438) {
      setIsActive([true, false, false, false])
    } else if (scrollPx < 3232) {
      setIsActive([false, true, false, false])
    } else if (scrollPx < 4026) {
      setIsActive([false, false, true, false])
    } else {
      setIsActive([false, false, false, true])
    }
  }
  // console.log(document.getElementById('chatsLink').innerHTML)
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#home" style={{margin: "0px 10px 5px 4px", padding: "0 0 2px 0"}}><img src={require('../logoblack.png')} height="30" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link className={`${isActive[0] ? 'active':''}`} id='laundryLink' href="#laundry">Laundry</Nav.Link>
            <Nav.Link className={`${isActive[1] ? 'active':''}`} id='eventsLink' href="#events">Events</Nav.Link>
            <Nav.Link className={`${isActive[2] ? 'active':''}`} id='chatsLink' href="#chats">Chats</Nav.Link>
            <Nav.Link className={`${isActive[3] ? 'active':''}`} id='maintenaceLink' href="#maintenace">Maintenance</Nav.Link>
          </Nav>[]
          <Button href="#" variant="outline-success" className="d-grid gap-2">Sign In</Button>{' '}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPreLogin;