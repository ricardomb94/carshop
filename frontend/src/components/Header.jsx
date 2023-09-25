import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import logo from '../assets/adamologo.png'

const Header = () => {
  return (
    <header>
        < Navbar  bg="primary" variant="primary" expand="lg" collapseOnSelect >
            <Container>
                <Navbar.Brand href="/" className="text-white">
                    <img src={logo} alt="adamo logo"className='adamologo'/>
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ms-auto'>
                            <Nav.Link href="/Panier" className="text-white" ><FaShoppingCart/>Panier</Nav.Link>
                            <Nav.Link href="/login" className="text-white" ><FaUser/>Connexion</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header