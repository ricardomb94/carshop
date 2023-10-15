import React from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { Fade} from "react-awesome-reveal";



const Features = ({vehicule}) => {
    console.log('vehicule', vehicule);
    const features = vehicule.features;

    console.log('FEATURES', features);
  return (
    <div>  <Row className='role'> 
    <h3 className='text-center  my-5'>Caractéristiques</h3>
   
            <Col md={6} className='mb-3 role ronded'>
               <ListGroup  variant='flush' className='text-center'>
               <Fade triggerOnce cascade >
                    <ListGroup.Item active> 
                        <span>Année : {vehicule.year} </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span>Couleur : {vehicule.color} </span>
                    </ListGroup.Item>
                    <ListGroup.Item active>
                        <span>Provenance : {vehicule.provenance} </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span>Mise en circulation : {vehicule.registration} </span>
                    </ListGroup.Item>
                    <ListGroup.Item active>
                        <span>Contrôle technique : {vehicule.vehicleInspection} </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span> Première main: {vehicule.originalOwner} </span>
                    </ListGroup.Item> 
                    </Fade>
                </ListGroup>
            </Col> 
            <Col md={6} className='mb-3 role ronded'>
                 <ListGroup  variant='flush' className='text-center'>
                 <Fade cascade  triggerOnce>
                <ListGroup.Item active>
                        <span> Km compteur: {vehicule.odometerReading} </span>
                    </ListGroup.Item>
                    <ListGroup.Item >
                        <span> Carburant: {vehicule.energy} </span>
                    </ListGroup.Item>
                    <ListGroup.Item active>
                        <span> Boite vitesse: {vehicule.transmission} </span>
                    </ListGroup.Item>
                    <ListGroup.Item >
                        <span> Sellerie: {vehicule.upholstery} </span>
                    </ListGroup.Item>
                    <ListGroup.Item active>
                        <span> Nbre de portes: {vehicule.doors} </span>
                    </ListGroup.Item>
                    <ListGroup.Item >
                        <span> Nbre de places: {vehicule.seats} </span>
                    </ListGroup.Item>
                    </Fade> 
                </ListGroup>
            </Col> 
    </Row></div>
  )
}

export default Features