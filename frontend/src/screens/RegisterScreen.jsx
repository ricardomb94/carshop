import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { PulseLoader } from "react-spinners";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation({});

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Le mot de passe ne correspond pas");
      return;
    } else {
      try {
        const res = await register({
          name,
          email,
          telephone,
          password,
        }).unwrap();
        dispatcher(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Créer votre compte</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type='text'
            placeholder='Votre nom'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type='email'
            placeholder='Votre e-mail'
            value={console.log(email)}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='telephone' className='my-3'>
          <Form.Label>Téléphone</Form.Label>
          <Form.Control
            type='telephone'
            placeholder='Votre numéro de téléphone'
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type='password'
            placeholder='Votre mot de passe'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword' className='my-3'>
          <Form.Label>confirmer le mot de passe</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirmer le mot de passe'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type='submit'
          variant='primary'
          className='mt-2'
          disabled={isLoading}
        >
          Créer un compte
        </Button>
        {isLoading && (
          <PulseLoader
            visible={+true}
            height={40}
            width={5}
            color='#36d7b7'
            aria-label='scale-loading'
            wrapperstyle={{}}
            wrapperclass='scale-wrapper'
          />
        )}
      </Form>
      <Row className='py-3'>
        <Col>
          Vous avez déjà un compte?{" "}
          <Link
            to={redirect ? `/connexion?redirect=${redirect}` : "/connexion"}
          >
            Connectez-vous
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
