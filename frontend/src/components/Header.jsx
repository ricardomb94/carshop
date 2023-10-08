import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import logo from '../assets/adamologo01.png'

const Header = () => {
  return (
    <header>
        < Navbar  bg="primary" variant="primary" expand="lg" collapseOnSelect >
            <Container>
                <LinkContainer to="/">
                <Navbar.Brand className="text-white">
                    <img src={logo} alt="adamo logo"className='adamologo'/>
                </Navbar.Brand>
                </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ms-auto'>
                            <LinkContainer to="/panier">
                            <Nav.Link  className="text-white" ><FaShoppingCart/>Panier</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/connexion">
                            <Nav.Link  className="text-white" ><FaUser/>Connexion</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header