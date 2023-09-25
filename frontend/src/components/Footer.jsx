import {Container, Row,Col} from 'react-bootstrap'

const Footer = () => {
    const currentYear = new Date().getUTCFullYear()
  return (
    <footer>
        <Container>
            <Row>
                <Col>
                <p>Adamoautos &copy; {currentYear} </p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer