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
                <LinkContainer to='/'>
                  <Nav.Link className='text-white'>Accueil</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/vehicules/all'>
                  <Nav.Link className='text-white'>Catalogue</Nav.Link>
                </LinkContainer>
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
                      Se deconnecter
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/connexion'>
                    <Nav.Link className='text-white'>
                      <FaUser />
                      Se connecter
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/vehiculeslist'>
                      <NavDropdown.Item>Liste de Véhicules</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderList'>
                      <NavDropdown.Item>List de Commandes</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/vehicule/create'>
                      <NavDropdown.Item>Ajouter un produit</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/service/create'>
                      <NavDropdown.Item>Ajouter des services</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Reveal>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
