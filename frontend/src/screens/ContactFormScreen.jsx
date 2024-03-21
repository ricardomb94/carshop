import React from "react";
import { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
// import FormContainer from "../components/FormContainer";
import { useSubmitContactFormMutation } from "../slices/contactApiSlice";
import { ScaleLoader } from "react-spinners";
import Message from "../components/Message";

const services = [
  "Service 1",
  "Service 2",
  "Service 3",
  "Service 4",
  "Service 5",
];

const ContactFormScreen = () => {
  const [
    submitContactForm,
    { isLoading, error },
  ] = useSubmitContactFormMutation();

  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    email: "",
    message: "",
    selectedService: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.selectedService) {
      // Submit the form
      submitContactForm(formData);
    } else {
      // Handle the case where no service is selected (e.g., display an error message)
      console.error("Please select a service.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Container fluid className='form-contact'>
      <h2 className='text-center pt-3'>Besoin d'aide ?</h2>
      <p className='text-center'>Laissez nous un message</p>
      {/* <FormContainer className='contactForm'> */}
      {isLoading && <ScaleLoader />}
      {error && <Message variant='danger'>{error.toString()}</Message>}
      <Form onSubmit={submitHandler}>
        <Row>
          <Col lg={6} md={12} sm={12}>
            <Form.Group controlId='name' className='my-3'>
              {/* <Form.Label>Nom</Form.Label> */}
              <Form.Control
                type='text'
                name='name'
                placeholder='Votre nom'
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <Form.Group controlId='telephone' className='my-3'>
              {/* <Form.Label>Téléphone</Form.Label> */}
              <Form.Control
                name='telephone'
                type='text'
                placeholder='Votre numéro de téléphone'
                value={formData.telephone}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12} sm={12}>
            <Form.Group controlId='service' className='my-3'>
              {/* <Form.Label>Type de service</Form.Label> */}
              <Form.Control
                name='service'
                type='text'
                as='select'
                value={formData.selectedService}
                onChange={handleInputChange}
              >
                <option disable>Sélectionnez un service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <Form.Group controlId='email' className='my-3'>
              {/* <Form.Label>E-mail</Form.Label> */}
              <Form.Control
                type='email'
                name='email'
                placeholder='Votre e-mail'
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='message' className='my-3'>
          {/* <Form.Label>Message</Form.Label> */}
          <Form.Control
            as='textarea'
            name='message'
            type='text'
            rows={4}
            placeholder='Votre message'
            value={formData.message}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-2 mb-2'>
          Envoyer
        </Button>
      </Form>
      {/* </FormContainer> */}
    </Container>
  );
};

export default ContactFormScreen;
