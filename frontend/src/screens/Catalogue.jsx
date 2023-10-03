import {Row, Col} from 'react-bootstrap'
import products from '../products'
import Product from '../components/Product'

const Catalogue = () => {
  return (
    <>
      <h1>Voitures récentes</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={8} lg={4} xl={4}>
            <Product  product={product}/>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Catalogue