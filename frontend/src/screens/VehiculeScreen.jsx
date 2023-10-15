import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  Row, 
  Col, 
  // Image, 
  ListGroup, 
  Card, Button, 
  // ListGroupItem, 
  // Container
} from 'react-bootstrap'
import vehicules from '../vehicules'
import Rating from '../components/Rating'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Features from '../components/Features'

const VehiculeScreen = (props) => {

    //Let's get the id from the URL to do so we can destructure anything from the params
    const {id: vehiculeId} = useParams()
    console.log(typeof vehiculeId);

    // Let's fetch the vehicule based on that id usng find() method
    const vehicule = vehicules.find((p) => p._id === Number(vehiculeId));
    console.log(vehicule)
    if (!vehicule) {
      return <div>Produit non trouvé</div>;
    }

    const images = vehicule.images.map((imageObj) => ({
        original: imageObj.original,
        thumbnail: imageObj.thumbnail,
      }));

  return (
    <>
        <Link className="btn btn-light my-3" to="/">Retour au Catalogue</Link>
        <Row>
            <Col md={6}>
            {/* <Card> */}
                {/* <Image src={vehicule.images[0].original} alt={vehicule.brand} fluid/> */}
                {/* <Card className='my-3 p-3 rounded'> */}
                  <ImageGallery
                    items={images}
                    alt={vehicule.brand}
                    thumbnailPosition='bottom'
                    fluid
                  />
                {/* </Card> */}
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h3>{vehicule.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item><strong>Compteur</strong>: {vehicule.odometerReading} </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating value={vehicule.rating} text={`${vehicule.numReviews} commentaires`}/>
                    </ListGroup.Item>
                    
                    <ListGroup.Item className='my-3 descript'>
                      <strong>Description : </strong> {vehicule.description} 
                    </ListGroup.Item>
                    
                </ListGroup>
            </Col>
            {/* <Col md={3}></Col> */}
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Prix:</Col>
                      <Col>
                        <strong>{vehicule.price} €</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Statut:</Col>
                      <Col>
                        <strong>{vehicule.countInStock > 0 ? "Disponible" : "indisponible"}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                   <Button 
                    className="btn-block"
                    type="button"
                    disabled={vehicule.countInStock === 0}
                    >
                      Ajouter au panier
                   </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              {/* <Row>
                <Col className='mt-5'><strong>Description : </strong> {vehicule.description}</Col>
              </Row> */}
            </Col> 
        </Row>
        <Features vehicule={vehicule}/>
       
    </>
  )
}

export default VehiculeScreen