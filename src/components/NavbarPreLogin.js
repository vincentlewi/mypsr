import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarPreLogin() {
  return (
    <Navbar bg="light" expand="lg" fixed="top" >
      <Container fluid>
        <Navbar.Brand href="#home" style={{margin: "0px 10px 10px 0"}}><img src={require('../logoblack.png')} height="30" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link href="#laundry">Laundry</Nav.Link>
            <Nav.Link href="#events">Events</Nav.Link>
            <Nav.Link href="#chats">Chats</Nav.Link>
            <Nav.Link href="#maintenace">Maintenance</Nav.Link>
          </Nav>
          <Button href="#" variant="outline-success" className="d-grid gap-2">Sign In</Button>{' '}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPreLogin;