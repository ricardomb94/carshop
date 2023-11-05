import {Link, useNavigate} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Button, Card, FormControl} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { Fade } from 'react-awesome-reveal'
import {addToCart, removeFromCart} from '../slices/cartSlice'

const CartScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state)=> state.cart)
    const {cartItems} = cart

    const addToCartHandler = async(vehicule, qty) => {
        dispatch(addToCart({...vehicule, qty}))
    }

    const removeFromCartHandler = async(id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    };

  return <Row>
  <Col md={8}>
    <h2 style={{marginBottom:'20px'}}>
        {/* <Fade cascade damping={0.1}> */}
        Votre Panier
        {/* </Fade> */}
    </h2>
    {cartItems.length === 0 ? (
        <Message>
            Votre panier est vide <Link to='/'>Retour</Link>
        </Message>
    ) : (
        <ListGroup >
            {
                cartItems.map((item) => (
                    <Fade key={item._qty}>
                        <ListGroup.Item >
                            <Row>
                                <Col md={2}>
                                    <Image src={item.images[0].thumbnail} alt={item.name}  fluid rounded/>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/vehicules/${item._id}`}>
                                        {item.name}
                                    </Link>
                                </Col>
                                <Col md={2}>
                                    {item.price} €
                                </Col>
                                <Col md={2}>
                                    <FormControl
                                        as='select'
                                        value={item.qty}
                                        onChange={(e)=> addToCartHandler(item, Number(e.target.value))}
                                        name="quantitySelect"
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                        ))}
                                    </FormControl>
                                </Col>
                                <Col md={2}>
                                    <Button type='button' variant='light'
                                        onClick={() => removeFromCartHandler(item._id) }
                                    >
                                        <FaTrash/>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </Fade>
                ))

            }
        </ListGroup>
    )}
  </Col>
  <Col md={4} mt={5}>
    <Card >
        <ListGroup >
            <ListGroup.Item>
                <h6>
                    Sous total : {cartItems.reduce((acc, item) => acc + item.qty, 0)} véhicules. 
                </h6>
                Coût: {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}€ 
            </ListGroup.Item>
            <ListGroup.Item>
                <Button
                type='button'
                className='btn-block'
                desabled={cartItems.length === 0}
                onClick={checkoutHandler}
                >
                    Achetez
                </Button>
            </ListGroup.Item>
        </ListGroup>
    </Card>
  </Col>
</Row>
    
  
}

export default CartScreen