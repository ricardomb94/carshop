import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Vehicule = ({ vehicule, imageUrl }) => {
  console.log("VEHIC", vehicule, "IMAGE-URL :", imageUrl);

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/vehicules/${vehicule._id}`}>
        <Card.Img src={imageUrl} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/vehicules/${vehicule._id}`}>
          <Card.Title as='div' className='vehicule-title'>
            <strong>{vehicule.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={vehicule.rating}
            text={`${vehicule.numReviews} commentaires`}
          />
        </Card.Text>
        <Card.Text as='h3'>{vehicule.price}€</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Vehicule;
