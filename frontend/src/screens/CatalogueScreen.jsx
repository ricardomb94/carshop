import {Row, Col} from 'react-bootstrap'
// import vehicules from '../vehicules'
import Vehicule from '../components/Vehicule'
import { Fade } from 'react-awesome-reveal';
import { useGetVehiculesQuery } from '../slices/vehiculesApiSlice';


const CatalogueScreen = () => {
  const {data: vehicules, isLoading, error } = useGetVehiculesQuery()
  console.log('VEHICULE******: ' + vehicules);

  return (
    <>
    {isLoading ? (
      <h2>Loading ... </h2>
    ) : error ? (<div>{error?.data?.message || error.error }</div>) : (<>
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