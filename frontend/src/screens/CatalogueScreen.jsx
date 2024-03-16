import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Vehicule from "../components/Vehicule";
import { Fade } from "react-awesome-reveal";
import { useGetVehiculesQuery } from "../slices/vehiculesApiSlice";
import { ScaleLoader } from "react-spinners";
import Message from "../components/Message";

const ITEMS_PER_PAGE = 6;

const CatalogueScreen = () => {
  const { data: vehicules, isLoading, error } = useGetVehiculesQuery();
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = vehicules
    ? vehicules.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getImageUrl = (vehicule) => {
    return vehicule.images.length > 0 ? vehicule.images[0].original : "";
  };

  return (
    <>
      {isLoading ? (
        <ScaleLoader
          visible={true}
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
              {currentItems.map((vehicule) => (
                <Col key={vehicule._id} sm={12} md={6} lg={4} xl={4}>
                  <Vehicule
                    vehicule={vehicule}
                    imageUrl={getImageUrl(vehicule)}
                    alt={vehicule.brand}
                  />
                </Col>
              ))}
            </Row>
          </Fade>
          <Row className='justify-content-center'>
            <Col>
              <Pagination>
                {Array.from({
                  length: Math.ceil(services.length / ITEMS_PER_PAGE),
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
              {/* <ContactFormScreen /> */}
              <CookiePolicyPopup />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default CatalogueScreen;
