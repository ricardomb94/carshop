import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  FormControl,
} from "react-bootstrap";

import Rating from "../components/Rating";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
// import { css } from '@emotion/react';
import { ScaleLoader } from "react-spinners";
import Features from "../components/Features";
import { Fade } from "react-awesome-reveal";
import { useGetVehiculeDetailsQuery } from "../slices/vehiculesApiSlice";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import fallback from "../assets/fallback.jpg";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

const baseUrl =
  (process.env.BASE_URL.endsWith("/")
    ? process.env.BASE_URL
    : process.env.BASE_URL + "/") || "";

const VehiculeScreenDetails = () => {
  const { id: vehiculeId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const { data: vehicule, isLoading, error } = useGetVehiculeDetailsQuery(
    vehiculeId
  );

  const addToCartHandler = () => {
    dispatch(addToCart({ ...vehicule, qty }));
    navigate("/panier");
  };
  console.log("VEHICULE IN DETAILS :", vehicule);
  // Check if vehicule is defined before rendering
  if (!vehicule) {
    return (
      <ScaleLoader
        visible={+true}
        height={40}
        width={5}
        color='#36d7b7'
        aria-label='scale-loading'
        wrapperstyle={{}}
        wrapperclass='scale-wrapper'
      />
    );
  }

  // Check if vehicule.images is defined before mapping
  const images =
    vehicule.images &&
    vehicule.images.map((imageObj) => ({
      original: `${baseUrl}${imageObj.original}`,
      thumbnail: `${baseUrl}${imageObj.thumbnail}`,
    }));
  console.log("IMAGES ARRAY :", images);

  const handleImageError = () => {
    // Display error message or a different fallback image
    toast.error("Image failed to load!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    console.error("Image failed to load");
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/vehicules/all'>
        Retour au Catalogue
      </Link>
      {isLoading ? (
        <ScaleLoader
          visible='true'
          height={40}
          width={5}
          color='#36d7b7'
          ariaLabel='scale-loading'
          wrapperStyle={{}}
          wrapperClass='scale-wrapper'
        />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div className='servicetitle' style={{ marginBottom: "2rem" }}>
            <h2 className='text-center'>
              <Fade cascade damping={0.1}>
                Détails Techniques
              </Fade>
            </h2>
          </div>
          <Fade>
            <Row>
              <Col md={6}>
                <Card>
                  <ImageGallery
                    msg={console.log("IMAGE IN IMAGEGALLERY :", images)}
                    items={
                      images && images.length > 0 ? (
                        images // Display text message otherwise
                      ) : (
                        <div key={vehicule._id} className='fallback-message'>
                          <img src={fallback} alt='fallback' />
                        </div>
                      )
                    }
                    alt={vehicule.brand}
                    thumbnailPosition='left'
                    fluid
                    onError={handleImageError}
                  />
                </Card>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h3>{vehicule.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Compteur</strong>: {vehicule.odometerReading}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        value={vehicule.rating}
                        text={`${vehicule.numReviews} commentaires`}
                      />
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
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
                          <strong>
                            {vehicule.countInStock > 0
                              ? "Disponible"
                              : "indisponible"}
                          </strong>
                          {console.log("COUNT-IN-STOCK", vehicule.countInStock)}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {vehicule.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>qté</Col>
                          <Col>
                            <FormControl
                              as='select'
                              value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                              name='quantitySelect'
                            >
                              {[...Array(vehicule.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </FormControl>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        className='btn-block ajouter'
                        type='button'
                        disabled={vehicule.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Ajouter au panier
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </Fade>
          <Row>
            <Col>
              <Card
                style={{
                  textAlign: "justify",
                  padding: "0.5em",
                  marginTop: "1.5rem",
                }}
              >
                <h5>Description : </h5> {vehicule.description}
              </Card>
            </Col>
          </Row>
          <Features vehicule={vehicule} />
        </>
      )}
    </>
  );
};

export default VehiculeScreenDetails;
