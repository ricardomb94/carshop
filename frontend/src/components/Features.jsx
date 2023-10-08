import React from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'


const Features = ({product}) => {
    console.log('PRODUCT', product);
    const features = product.features;

    console.log('FEATURES', features);
  return (
    <div>  <Row className='role'> 
    <h3 className='text-center  my-5'>Caractéristiques</h3>
   
                <Col md={6} className='mb-3 role ronded'>
               <ListGroup  variant='flush' className='text-center'>
                    <ListGroup.Item active> 
                        <span>Année : {product.year} </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span>Couleur : {product.color} </span>
                    </ListGroup.Item>
                    <ListGroup.Item active>
                        <span>Provenance : {product.provenance} </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span>Mise en circulation : {product.registration} </span>
                    </ListGroup.Item>
                    <ListGroup.Item active>
                        <span>Contrôle technique : {product.vehicleInspection} </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span> Première main: {product.originalOwner} </span>
                    </ListGroup.Item> 
                    
                </ListGroup>
            </Col> 
            <Col md={6} className='mb-3 role ronded'>
                 <ListGroup  variant='flush' className='text-center'>
                <ListGroup.Item active>
                        <span> Km compteur: {product.odometerReading} </span>
                    </ListGroup.Item>
                    <ListGroup.Item >
                        <span> Carburant: {product.energy} </span>
                    </ListGroup.Item>
                    <ListGroup.Item active>
                        <span> Boite vitesse: {product.transmission} </span>
                    </ListGroup.Item>
                    <ListGroup.Item >
                        <span> Sellerie: {product.upholstery} </span>
                    </ListGroup.Item>
                    <ListGroup.Item active>
                        <span> Nbre de portes: {product.doors} </span>
                    </ListGroup.Item>
                    <ListGroup.Item >
                        <span> Nbre de places: {product.seats} </span>
                    </ListGroup.Item> 
                </ListGroup>
            </Col> 
    </Row></div>
  )
}

export default Features