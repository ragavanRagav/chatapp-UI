import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
    let navigate = useNavigate();
    const logout=()=>{
        sessionStorage.removeItem("loginStat")
        sessionStorage.removeItem("userDetails")
        navigate("/login");
    }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Chat-App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/login">
                <Link className="link" to="/"> Home</Link>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#" onClick={logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
