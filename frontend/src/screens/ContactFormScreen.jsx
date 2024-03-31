import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useSubmitContactFormMutation } from "../slices/contactApiSlice";
import { ScaleLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import openSocket from "socket.io-client";

const socket = openSocket.connect("http://localhost:8080");

const services = [
  "Moteur",
  "Transmission",
  "Roues",
  "Suspension",
  "Embrayage",
  "Diagnostique",
  "Entretien",
];

const ContactFormScreen = () => {
  const [submitContactForm, { isLoading }] = useSubmitContactFormMutation();
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    email: "",
    message: "",
    selectedService: "",
  });
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

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
          selectedService: "", // Set as default value
        });
        toast.success("Message envoyé avec succès!");
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Une erreur lors de l'envoie: " + error.toString());
      }
    } else {
      // Handle the case where no service is selected (e.g., display an error message)
      console.error("Please select a service.");
      toast.error("Choisissez un service.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Socket.IO logic
  useEffect(() => {
    // Connect to the socket server on component mount
    console.log(
      "Connecting to Socket.IO server:",
      socket.io.opts.transport,
      socket.io.opts.hostname,
      socket.io.opts.port
    );

    socket.on("connect", () => {
      setIsSocketConnected(true);
      console.log("Socket connected!");
    });

    socket.on("disconnect", () => {
      setIsSocketConnected(false);
      console.error("Socket disconnected. Attempting reconnection...");
      socket.connect(); // Automatically try to reconnect on disconnect
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      // Handle connection errors gracefully, e.g., display a user-friendly message
    });

    socket.on("new_message", (data) => {
      setUnreadMessagesCount(unreadMessagesCount + 1);
      // Optionally trigger a re-render to update the badge visually
    });

    // Disconnect from socket on component unmount
    return () => socket.disconnect();
  }, [unreadMessagesCount]);

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
            <Form.Group controlId='selectedService' className='my-3'>
              <Form.Control
                name='selectedService'
                type='text'
                as='select'
                // value={formData.selectedService}
                onChange={handleInputChange}
              >
                <option value=''>Sélectionnez un service</option>
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
