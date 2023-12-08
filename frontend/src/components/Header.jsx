import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/adamologo01.png";
// import logo from '../assets/adamo-logo-3.jpeg'
// import logo from '../assets/adamo-logo-7.jpeg'
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
// import logo2 from "../assets/adamologo1.png";
import { Reveal, Fade } from "react-awesome-reveal";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(dispatch(logout()), navigate("/connexion"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar bg='primary' variant='primary' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='text-white'>
              <Fade direction='left'>
                <img src={logo} alt='adamo logo' className='adamologo' />
              </Fade>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Reveal cascade>
                <LinkContainer to='/panier'>
                  <Nav.Link className='text-white'>
                    <FaShoppingCart />
                    Panier
                    {cartItems.length > 0 && (
                      <Badge pill bg='success' style={{ marginLeft: "5px" }}>
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Deconnexion
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/connexion'>
                    <Nav.Link href='/connexion' className='text-white'>
                      <FaUser />
                      Connexion
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Reveal>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin, '>
                  <LinkContainer to='admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
