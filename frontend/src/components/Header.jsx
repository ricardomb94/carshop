import {Navbar, Nav, Container, Badge} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import logo from '../assets/adamologo01.png'
// import logo from '../assets/adamo-logo-3.jpeg'
// import logo from '../assets/adamo-logo-7.jpeg'
import { useSelector} from 'react-redux'


import { Reveal, Fade} from "react-awesome-reveal";

const Header = () => {

    const {cartItems } = useSelector((state) => state.cart)

  return (
    <header>
        < Navbar  bg="primary" variant="primary" expand="lg" collapseOnSelect >
            <Container>
                <LinkContainer to="/">
                <Navbar.Brand className="text-white">
                    <Fade direction='left'>
                    <img src={logo} alt="adamo logo"className='adamologo'/>
                    </Fade>
                </Navbar.Brand>
                </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ms-auto'>
                            <Reveal cascade >
                            <LinkContainer to="/panier">
                            <Nav.Link  className="text-white" >
                                <FaShoppingCart/>Panier
                                {
                                    cartItems.length > 0 && (
                                        <Badge pill bg='success' style={{marginLeft:'5px'}} >
                                            {cartItems.reduce((a, c) => a + c.qty, 0)}
                                        </Badge>
                                    )
                                }
                            </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/connexion">
                            <Nav.Link  className="text-white" ><FaUser/>Connexion</Nav.Link>
                            </LinkContainer>
                            </Reveal>
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header