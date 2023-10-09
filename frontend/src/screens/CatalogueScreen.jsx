import {Row, Col} from 'react-bootstrap'
import vehicules from '../vehicules'
import Vehicule from '../components/Vehicule'

const CatalogueScreen = () => {
  return (
    <>
      <h1>Voitures récentes</h1>
      <Row>
        {vehicules.map((vehicule) => (
          <Col key={vehicule._id} sm={12} md={8} lg={4} xl={4}>
            <Vehicule  vehicule={vehicule}/>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default CatalogueScreen