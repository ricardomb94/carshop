import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/connexion'>
            <Nav.Link>Connexion</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Connexion</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Expédition</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Expédition</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payement'>
            <Nav.Link>Payement</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payement</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link> Commandez</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled> Commandez</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
