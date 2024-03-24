import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Service = ({ service, imageUrl }) => {
  // Function to generate random RGB color
  const randomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const a = Math.random(); // generates a random number between 0.0 and 1.0
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  console.log("SERVICE", service, "IMAGE-URL :", imageUrl);
  return (
    <div>
      <Card className='my-3 p-3 service-card'>
        {/* <Link to={`/services/${service._id}`}> */}
        <Card.Img
          src={imageUrl}
          alt={service.brand}
          className='service-image'
          variant='top'
          style={{ objectFit: "cover" }}
        />
        {/* </Link> */}
        <Card.Body style={{ backgroundColor: randomColor(), color: "black" }}>
          {/* <Link to={`/services/${service._id}`}> */}
          <Card.Title as='div' className='service-title'>
            <strong>{service.title}</strong>
          </Card.Title>
          {/* </Link> */}
          <Card.Text className='text-justify' as='p'>
            {service.description}
          </Card.Text>
          <a href='#' className='btn btn-primary btn-service'>
            en savoir +
          </a>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Service;

// import { Card } from "react-bootstrap";
// import { Link } from "react-router-dom";

// const Service = ({ service, imageUrl }) => {
//   console.log("SERVICE", service, "IMAGE-URL :", imageUrl);
//   return (
//     <div>
//       <Card className='my-3 p-3 service-card'>
//         <Link to={`/services/${service._id}`}>
//           <Card.Img
//             src={imageUrl}
//             className='service-image'
//             variant='top'
//             style={{ objectFit: "cover" }}
//           />
//         </Link>
//         <Card.Body
//           style={{ backgroundColor: "rgb(200 201 221)", color: "black" }}
//         >
//           <Link to={`/services/${service._id}`}>
//             <Card.Title as='div' className='service-title'>
//               <strong>{service.title}</strong>
//             </Card.Title>
//           </Link>
//           <Card.Text
//             className='text-justify'
//             as='p'
//             // style={{ maxHeight: "10rem", overflow: "hidden" }}
//           >
//             {service.description}
//           </Card.Text>
//           <a href='#' className='btn btn-primary'>
//             en savoir +
//           </a>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default Service;
