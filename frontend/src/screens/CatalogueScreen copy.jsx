// CatalogueScreen.js
import React, { useState } from "react";
import { Row, Col, Pagination } from "react-bootstrap";
import Vehicule from "../components/Vehicule"; // Updated import
import { Fade } from "react-awesome-reveal";
import { useGetVehiculesQuery } from "../slices/vehiculesApiSlice";
import { ScaleLoader } from "react-spinners";
import Message from "../components/Message";

const ITEMS_PER_PAGE = 6;
// const baseUrl = process.env.BASE_URL || "";
// console.log("BASE_URL in CATALOGUE :", baseUrl);

const CatalogueScreen = () => {
  const { data: vehicules, isLoading, error } = useGetVehiculesQuery();
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = vehicules
    ? vehicules.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // console.log("VEHICLE IMAGE ORIGINAL", vehicules.images[0].original);
  return (
    <>
      {isLoading ? (
        <ScaleLoader
          visible={+true}
          height={40}
          width={5}
          color='#36d7b7'
          aria-label='scale-loading'
          wrapperstyle={{}}
          wrapperclass='scale-wrapper'
        />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h2 className='text-center'>
            <Fade cascade damping={0.1}>
              Véhicules à vendre
            </Fade>
          </h2>

          <Fade triggerOnce cascade>
            <Row>
              {currentItems.map((vehicule) => {
                const imageUrl =
                  vehicule.images.length > 0 ? vehicule.images[0].original : "";
                // const imageUrl =
                //   vehicule.images.length > 0
                //     ? `/${vehicule.images[0].original}`
                //     : "";
                console.log(
                  "VEHICULE IMAGES IN CATALG-SCREEN :",
                  vehicule.image
                );
                return (
                  <Col key={vehicule._id} sm={12} md={6} lg={4} xl={4}>
                    <Vehicule
                      vehicule={vehicule}
                      imageUrl={imageUrl}
                      alt={vehicule.brand}
                    />
                    {imageUrl ? (
                      <img src={imageUrl} alt={vehicule.brand} />
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        No image available
                      </div>
                    )}
                  </Col>
                );
              })}
            </Row>
          </Fade>

          <Row className='justify-content-center'>
            <Col>
              <Pagination>
                {Array.from({
                  length: Math.ceil(vehicules.length / ITEMS_PER_PAGE),
                }).map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default CatalogueScreen;
