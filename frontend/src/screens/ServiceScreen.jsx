// ServiceScreen.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ScaleLoader } from "react-spinners";
// import Message from "../components/Message";
// import ServiceList from "../screens/admin/ServiceList";
// import ServiceCreateScreen from "../screens/admin/ServiceCreateScreen";
// import {
//   useGetServicesQuery,
//   useCreateServiceMutation,
// } from "../slices/servicesApiSlice";

// const ServiceScreen = () => {
//   const { data: services, isLoading, error } = useGetServicesQuery();
//   const [currentPage, setCurrentPage] = useState(1);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <>
//       <Link
//         className='btn btn-light my-3 position-fixed bottom-0 end-0 m-4'
//         to='/'
//       >
//         Voir le Catalogue
//       </Link>

//       <ServiceCreateScreen />

//       {isLoading ? (
//         <ScaleLoader
//           visible={+true}
//           height={40}
//           width={5}
//           color='#36d7b7'
//           aria-label='scale-loading'
//           wrapperstyle={{}}
//           wrapperclass='scale-wrapper'
//         />
//       ) : error ? (
//         <Message variant='danger'>
//           {error?.data?.message || error.error}
//         </Message>
//       ) : (
//         <ServiceList
//           services={services}
//           currentPage={currentPage}
//           paginate={paginate}
//         />
//       )}
//     </>
//   );
// };

// export default ServiceScreen;

import React from "react";
import { Row, Col, Pagination, Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

const ServiceScreen = ({ services, currentPage, paginate }) => {
  const ITEMS_PER_PAGE = 6;

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = services
    ? services.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <>
      <h2 className='text-center'>
        <Fade cascade damping={0.1}>
          Garage Services
        </Fade>
      </h2>

      <Fade triggerOnce cascade>
        <Row>
          {currentItems.map((service) => (
            <Col key={service._id} sm={12} md={6} lg={4} xl={4}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant='top' src={service.imageUrl} />
                <Card.Body>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                </Card.Body>
              </Card>
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
        </Col>
      </Row>
    </>
  );
};

export default ServiceScreen;
