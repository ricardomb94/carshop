import React from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/adamologo01.png";
import { Fade } from "react-awesome-reveal";

const Footer2 = () => {
  return (
    <footer className='footer goldenrod text-light py-3'>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <Navbar.Brand className='text-white'>
              <Fade direction='left'>
                <img src={logo} alt='adamo logo' className='adamologo' />
              </Fade>
            </Navbar.Brand>
            <p className='mb-0'>
              &copy; {new Date().getFullYear()} My Garage. All rights reserved.
            </p>
          </Col>
          <Col xs={12} md={6} className='d-flex justify-content-end'>
            <Navbar className='text-light' bg='success' expand='md'>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                  <Nav.Link href='/'>Home</Nav.Link>
                  <Nav.Link href='/services'>Services</Nav.Link>
                  <Nav.Link href='/contact'>Contact</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer2;
