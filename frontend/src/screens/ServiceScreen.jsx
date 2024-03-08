import { Row, Col, Pagination } from "react-bootstrap";
import { Fade, Slide } from "react-awesome-reveal";
import { useGetServicesQuery } from "../slices/servicesApiSlice";
import Service from "../components/Service";
import Message from "../components/Message";
import { ScaleLoader } from "react-spinners";
import { useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { useGetVehiculesQuery } from "../slices/vehiculesApiSlice";
import CookiePolicyPopup from "../components/CookiePolicyPopup";
// import ContactFormScreen from "./ContactFormScreen";
// import Footer from "../components/Footer-2";

const ITEMS_PER_PAGE = 6;

const ServiceScreen = () => {
  const { data: services, isLoading, error } = useGetServicesQuery();
  console.log("SERVICELIST", services);

  const { data: vehicules } = useGetVehiculesQuery();
  console.log("SERVICELIST IN SERVICE SCREEN", vehicules);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = services
    ? services.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!vehicules) {
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

  return (
    <>
      <h2 className='text-center mt-5'>
        <Slide cascade damping={0.1}>
          Nos services
        </Slide>
      </h2>

      <p className='text-center mt-5'>
        Bienvenue vous trouverez sur cete page et sur l'ensemble du site, une
        variété de services que nous proposons. Que vous cherchiez à acheter une
        nouvelle voiture, à faire réparer votre véhicule actuel ou à obtenir des
        conseils d'experts sur l'entretien de votre voiture, nous sommes là pour
        vous aider. Nos services sont conçus pour répondre à vos besoins
        spécifiques et nous nous efforçons toujours de dépasser vos attentes.
        N'hésitez pas à parcourir nos offres et à sélectionner celle qui répond
        à vos besoins.
      </p>

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
          <Fade triggerOnce cascade>
            <div className='service-grid'>
              <Row>
                {currentItems.map((service) => {
                  const imageUrl =
                    service.images.length > 0
                      ? `http://localhost:5000/${service.images[0].thumbnail}`
                      : "";
                  console.log("SERVICE IMAGES IN S-SCREEN :", service.image);
                  return (
                    <Col key={service._id} sm={12} md={6} lg={4} xl={4}>
                      <Service service={service} imageUrl={imageUrl} />
                    </Col>
                  );
                })}
              </Row>
              {/* <Footer /> */}
            </div>
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

export default ServiceScreen;
