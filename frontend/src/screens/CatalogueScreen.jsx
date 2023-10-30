import {Row, Col} from 'react-bootstrap'
// import vehicules from '../vehicules'
import Vehicule from '../components/Vehicule'
import { Fade } from 'react-awesome-reveal';
import { useGetVehiculesQuery } from '../slices/vehiculesApiSlice';
import { ScaleLoader } from 'react-spinners';
import Message from '../components/Message';


const CatalogueScreen = () => {
  const {data: vehicules, isLoading, error } = useGetVehiculesQuery()
  console.log('VEHICULE******: ' + vehicules);

  return (
    <>
    {isLoading ? (
      <>
        <ScaleLoader
          visible={+true}
          height={40}
          width={5}
          color="#36d7b7"
          aria-label="scale-loading"
          wrapperstyle={{}}
          wrapperclass="scale-wrapper"
        />
      </>
    ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error }</Message>
    ) : (<>
       <h1>Voitures récentes</h1>
       <Fade triggerOnce cascade>
       <Row>
         {vehicules.map((vehicule) => (
           <Col key={vehicule._id} sm={12} md={6} lg={4} xl={4}>
             <Vehicule  vehicule={vehicule}/>
           </Col>
         ))}
       </Row>
       </Fade>
    </>)}
     
    </>
  )
}

export default CatalogueScreen