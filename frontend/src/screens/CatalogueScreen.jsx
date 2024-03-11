// CatalogueScreen.js
import React, { useState } from "react";
import { Row, Col, Pagination } from "react-bootstrap";
import Vehicule from "../components/Vehicule"; // Updated import
import { Fade } from "react-awesome-reveal";
import { useGetVehiculesQuery } from "../slices/vehiculesApiSlice";
import { ScaleLoader } from "react-spinners";
import Message from "../components/Message";

const ITEMS_PER_PAGE = 6;
const baseUrl = process.env.BASE_URL || "";

const CatalogueScreen = () => {
  const { data: vehicules, isLoading, error } = useGetVehiculesQuery();
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = vehicules
    ? vehicules.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <div className='servicetitle' style={{ marginBottom: "2rem" }}>
            <h2 className='text-center'>
              <Fade cascade damping={0.1}>
                Véhicules à vendre
              </Fade>
            </h2>
          </div>

          <Fade triggerOnce cascade>
            <Row>
              {currentItems.map((vehicule) => {
                const imageUrl =
                  vehicule.images && vehicule.images.length > 0
                    ? `${baseUrl}/${vehicule.images[0].original}`
                    : null;

                return (
                  <Col key={vehicule._id} sm={12} md={6} lg={4} xl={4}>
                    {imageUrl ? (
                      <Vehicule vehicule={vehicule} imageUrl={imageUrl} />
                    ) : (
                      <p className='text-center'>Image non disponible</p>
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
