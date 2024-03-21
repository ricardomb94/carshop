import React from "react";
import { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useSubmitContactFormMutation } from "../slices/contactApiSlice";
import { ScaleLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.selectedService) {
      // Submit the form
      try {
        await submitContactForm(formData);
        // Reset form fields after successful submission
        setFormData({
          name: "",
          telephone: "",
          email: "",
          message: "",
          selectedService: "",
        });
        toast.success("Form submitted successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting form: " + error.toString());
      }
    } else {
      // Handle the case where no service is selected (e.g., display an error message)
      console.error("Please select a service.");
      toast.error("Please select a service.");
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
      {isLoading && (
        <div className='spinner-overlay'>
          <ScaleLoader />
        </div>
      )}
      <Form onSubmit={submitHandler}>
        <Row>
          <Col lg={6} md={12} sm={12}>
            <Form.Group controlId='name' className='my-3'>
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
      <ToastContainer />
    </Container>
  );
};

export default ContactFormScreen;
