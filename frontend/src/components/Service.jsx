import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Service = ({ service, imageUrl }) => {
  console.log("SERVICE", service, "IMAGE-URL :", imageUrl);
  return (
    <div className='service-card'>
      <Card className='my-3 p-3'>
        <Link to={`/services/${service._id}`}>
          <Card.Img
            src={imageUrl}
            className='service-image'
            variant='top'
            style={{ objectFit: "cover" }}
          />
        </Link>
        <Card.Body style={{ backgroundColor: "#016FB9", color: "white" }}>
          <Link to={`/services/${service._id}`}>
            <Card.Title as='div' className='service-title'>
              <strong>{service.title}</strong>
            </Card.Title>
          </Link>
          <Card.Text
            className='text-justify'
            as='p'
            // style={{ maxHeight: "10rem", overflow: "hidden" }}
          >
            {service.description}
          </Card.Text>
          <a href='#' className='btn btn-primary'>
            en savoir +
          </a>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Service;
