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
import FlipCard from "../components/FlipCard";
// import ContactFormScreen from "./ContactFormScreen";
// import Footer from "../components/Footer-2";

const ITEMS_PER_PAGE = 6;
// const baseUrl = process.env.BASE_URL || "";

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
      <div className='servicetitle' style={{ marginBottom: "2rem" }}>
        <h2 className='text-center '>
          <Slide cascade damping={0.1}>
            Nos services
          </Slide>
        </h2>
      </div>
      <div style={{ margin: "0rem" }}>
        <Row>
          <Col sm={12} md={6} lg={6} className='mb-5'>
            <FlipCard
              front="Bienvenue nous proposons une variété de service. Que vous cherchiez à acheter une nouvelle voiture, à faire réparer votre véhicule actuel ou à obtenir des conseils d'experts sur l'entretien de votre voiture, nous sommes là pour vous aider."
              back="Nos services sont conçus pour répondre à vos besoins spécifiques et nous nous efforçons toujours de dépasser vos attentes. N'hésitez pas à parcourir nos offres et à sélectionner celle qui répond à vos besoins."
            />
          </Col>
          <Col sm={12} md={6} lg={6} className='mb-5'>
            <FlipCard
              front="Nous proposons une large gamme de services pour répondre à tous vos besoins automobiles. De l'entretien régulier aux réparations majeures,nous sommes là pour vous aider à chaque étape du processus."
              back='Notre équipe de professionnels expérimentés est dédiée à fournir un service de qualité supérieure à chaque client. Nous sommes fiers de notre travail et nous nous engageons à vous offrir une expérience exceptionnelle.'
            />
          </Col>
        </Row>
      </div>

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
                  service.images.length > 0 ? service.images[0].thumbnail : "";
                  // const imageUrl =
                  //   service.images.length > 0
                  //     ? `/${service.images[0].thumbnail}`
                  //     : "";
                  console.log("SERVICE IMAGES IN S-SCREEN :", service.image);
                  return (
                    <Col key={service._id} sm={12} md={6} lg={4} xl={4}>
                      <Service
                        service={service}
                        imageUrl={imageUrl}
                        alt={service.title}
                      />
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
