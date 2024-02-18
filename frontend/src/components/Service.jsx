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
        <Card.Text className='text-justify text-truncate' as='p'>
          {service.description}
        </Card.Text>
        <a href='#' class='btn btn-primary'>
          Go somewhere
        </a>
      </Card.Body>
    </Card>
  );
};

export default Service;
