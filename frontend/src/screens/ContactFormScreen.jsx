import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
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
    selectedService: services[0],
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
    <>
      <FormContainer>
        {isLoading && <ScaleLoader />}
        {error && <Message variant='danger'>{error.toString()}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='my-3'>
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type='text'
              name='name'
              placeholder='Votre nom'
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='telephone' className='my-3'>
            <Form.Label>Téléphone</Form.Label>
            <Form.Control
              name='telephone'
              type='text'
              placeholder='Votre numéro de téléphone'
              value={formData.telephone}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='email' className='my-3'>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Votre e-mail'
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='message' className='my-3'>
            <Form.Label>Message</Form.Label>
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
          <Form.Group controlId='service' className='my-3'>
            <Form.Label>Type de service</Form.Label>
            <Form.Control
              name='service'
              type='text'
              as='select'
              value={formData.selectedService}
              onChange={handleInputChange}
            >
              <option value={formData.selectedService} disabled>
                Sélectionnez un service
              </option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary' className='mt-2'>
            Envoyer
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ContactFormScreen;
