import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Container} from 'react-bootstrap'
import products from '../products'
import Rating from '../components/Rating'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Features from '../components/Features'

const ProductScreen = (props) => {

    //Let's get the id from the URL to do so we can destructure anything from the params
    const {id: productId} = useParams()
    console.log(typeof productId);

    // Let's fetch the product based on that id usng find() method
    const product = products.find((p) => p._id === Number(productId));
    console.log(product)
    if (!product) {
      return <div>Produit non trouvé</div>;
    }

    const images = product.images.map((imageObj) => ({
        original: imageObj.original,
        thumbnail: imageObj.thumbnail,
      }));

  return (
    <>
        <Link className="btn btn-light my-3" to="/">Retour au Catalogue</Link>
        <Row>
            <Col md={6}>
                {/* <Image src={product.images[0].original} alt={product.brand} fluid/> */}
                {/* <Card className='my-3 p-3 rounded'> */}
                  <ImageGallery
                    items={images}
                    alt={product.brand}
                    thumbnailPosition='bottom'
                    fluid
                  />
                {/* </Card> */}
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} commentaires`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>Prix: {product.price} €</ListGroup.Item>
                    </ListGroup>
                </Col>
        </Row>
        <Features product={product}/>
       
    </>
  )
}

export default ProductScreen