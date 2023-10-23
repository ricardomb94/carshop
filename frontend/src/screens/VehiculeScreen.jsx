import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
// import vehicules from '../vehicules'
import Rating from '../components/Rating'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Features from '../components/Features';
// import Features from '../components/Features' 

const VehiculeScreen = () => {

    //Let's get the id from the URL to do so we can destructure anything from the params
    // console.log("TYPEOF-VEHICULEID", typeof vehiculeId);
    // console.log("VEHICULEID", vehiculeId);
    // console.log("VEHICULESCREEN", vehicules)

     // Convert vehiculeId to a string
    //  const stringVehiculeId = JSON.stringify(vehiculeId);

  const { id: vehiculeId } = useParams();
  const [vehicule, setVehicule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicule = async () => {
      try {
        const response = await axios.get(`/api/vehicules/${vehiculeId}`);
        setVehicule(response.data);
        console.log('RES.DATA', response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicule:', error);
        setLoading(false);
      }
    };

    fetchVehicule();
  }, [vehiculeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

    // Check if vehicule.images is defined before mapping
  const images = vehicule.images && vehicule.images.map((imageObj) => ({
    original: imageObj.original,
    thumbnail: imageObj.thumbnail,
  }));

  return (
    <>
        <Link className="btn btn-light my-3" to="/">Retour au Catalogue</Link>
        <Row>
        <Col md={6}>
          <ImageGallery items={images} alt={vehicule.brand} thumbnailPosition='bottom' fluid />
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