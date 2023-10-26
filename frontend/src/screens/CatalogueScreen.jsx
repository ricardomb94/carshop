import {useEffect, useState} from 'react'
import {Row, Col} from 'react-bootstrap'
// import vehicules from '../vehicules'
import Vehicule from '../components/Vehicule'
import axios from 'axios'
import { Fade } from 'react-awesome-reveal';


const CatalogueScreen = () => {
  const [vehicules, setVehicules] = useState([])

  useEffect(() => {
    const fetchVehicules = async() =>{
      const {data} = await axios.get("/api/vehicules")
      setVehicules(data)
      console.log(typeof data);
    };

    fetchVehicules()
  }, [])

  return (
    <>
      <h1>Voitures récentes</h1>
      <Fade triggerOnce cascade>
      <Row>
        {vehicules.map((vehicule) => (
          <Col key={vehicule._id} sm={12} md={8} lg={4} xl={4}>
            <Vehicule  vehicule={vehicule}/>
          </Col>
        ))}
      </Row>
      </Fade>
    </>
  )
}

export default CatalogueScreen