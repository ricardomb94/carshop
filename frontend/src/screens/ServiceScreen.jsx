import { Row, Col, Pagination, Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import { useGetServicesQuery } from "../slices/servicesApiSlice";
import Service from "../components/Service";
import Message from "../components/Message";
import { ScaleLoader } from "react-spinners";
import { useState } from "react";

const ITEMS_PER_PAGE = 6;

const ServiceScreen = () => {
  const { data: services, isLoading, refresh, error } = useGetServicesQuery();
  console.log("SERVICELIST", services);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = services
    ? services.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h2 className='text-center'>
        <Fade cascade damping={0.1}>
          Adamoautos votre garage de Services
        </Fade>
      </h2>

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
          {/* <h2 className='text-center'>
            <Fade cascade damping={0.1}>
              Véhicules à vendre
            </Fade>
          </h2> */}

          <Fade triggerOnce cascade>
            <Row>
              {currentItems.map((service) => {
                const imagePath = `http://localhost:5000/${service.image}`;

                return (
                  <Col key={service._id} sm={12} md={6} lg={4} xl={4}>
                    <Service service={service} imagePath={imagePath} />
                  </Col>
                );
              })}
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
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ServiceScreen;
