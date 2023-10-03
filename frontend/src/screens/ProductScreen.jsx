import React from 'react'
import { useParams } from 'react-router-dom'
import products from '../products'

const ProductScreen = () => {

    //Let's get the id from the URL to do so we can destructure anything from the params
    const {id: productId} = useParams()
    console.log(typeof productId);

    // Let's fetch the product based on that id usng find() method
    const product = products.find((p) => p._id === Number(productId));
    console.log(product)
    if (!product) {
      return <div>Produit non trouvé</div>;
    }
    console.log(product);

  return (
    <div>ProductScreen</div>
  )
}

export default ProductScreen