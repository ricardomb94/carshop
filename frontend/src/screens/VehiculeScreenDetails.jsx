import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  Row, 
  Col, 
  ListGroup, 
  Card, Button, 
  
} from 'react-bootstrap'

import Rating from '../components/Rating'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
// import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';
import Features from '../components/Features';
import { Fade } from 'react-awesome-reveal';
import { useGetVehiculeDetailsQuery } from '../slices/vehiculesApiSlice';
import Message from '../components/Message';

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

const VehiculeScreenDetails = () => {

  const { id: vehiculeId } = useParams();
  const {data: vehicule, isLoading, error } = useGetVehiculeDetailsQuery(vehiculeId)


 // Check if vehicule is defined before rendering
 if (!vehicule) {
  return <ScaleLoader
  visible={+true}
  height={40}
  width={5}
  color="#36d7b7"
  aria-label="scale-loading"
  wrapperstyle={{}}
  wrapperclass="scale-wrapper"
/>// or other loading indicator; 
}

    // Check if vehicule.images is defined before mapping
  const images = vehicule.images && vehicule.images.map((imageObj) => ({
    original: imageObj.original,
    thumbnail: imageObj.thumbnail,
  }));

  return (
    <>
      <Link className="btn btn-light my-3" to="/">Retour au Catalogue</Link>
    {isLoading ? (
      
        <ScaleLoader
          visible="true"
          height={40}
          width={5}
          color="#36d7b7"
          ariaLabel="scale-loading"
          wrapperStyle={{}}
          wrapperClass="scale-wrapper"
        />
      ): error ? (
        <Message variant='danger'>{error?.data?.message || error.error }</Message>
      ) : (
      <>
        <Fade >
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
                </ListGroup>
                <ListGroup>
                  <ListGroup>
                        <Card
                          // className='py-3 px-3'
                          style={{
                            display:'inherited',
                            width: '28rem',
                            textAlign: 'justify',
                            padding: '0.5em',
                            marginTop: '1.5rem'
                          }}
                        >
                          <strong>Description : </strong> {vehicule.description}
                        </Card> 
                  </ListGroup>
                </ListGroup>
            </Col>
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
            </Col> 
        </Row>
        </Fade>
        <Features vehicule={vehicule}/>
    </>)}
    </>
  )
}

export default VehiculeScreenDetails