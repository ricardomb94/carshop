import {Card }from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Rating from './Rating'

const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/productx/${product._id}`}>
            <Card.Img src={product.images[0].original} variant="top" />
        </Link>
        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div" className='product-title'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <Rating 
                value={product.rating} 
                text={`${product.numReviews} commentaires`}
                />
            </Card.Text>
            <Card.Text as="h3">
                {product.price}€
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product