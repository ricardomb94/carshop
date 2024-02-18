import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Service = ({ service, imagePath }) => {
  console.log("SERVICE COMPONENT", service, "IMAGE-PAATH :", imagePath);

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/services/${service._id}`}>
        <Card.Img src={imagePath} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/services/${service._id}`}>
          <Card.Title as='div' className='service-title'>
            <strong>{service.title}</strong>
          </Card.Title>
        </Link>
        <Card.Text className='text-justify' as='p'>
          {service.description}
        </Card.Text>
        <a href='#' className='btn btn-primary'>
          en savoir +
        </a>
      </Card.Body>
    </Card>
  );
};

export default Service;
