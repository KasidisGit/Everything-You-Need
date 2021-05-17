import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const axios = require('axios');
const accessTokenStorage = window.localStorage;

export default function Product() {

  const [products, setProducts] = useState([]);

  const submitHandler = (productId) => {
    accessTokenStorage.setItem('productId', productId)
  };

  useEffect( () => {

    axios.get(
        'http://localhost:9000/api/v1/products', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ accessTokenStorage.getItem('UserAccessToken') ,
            'Access-Control-Allow-Origin' : '*'
          }
    }).then(product => {
        setProducts(product.data.rows)
    })
    .catch(err => {
        console.error(err)
      });
    
  } , [])


  return (
    <div className="ListProduct">
        { products.map((element, idx) => {

            return <>

            <pre>
                {JSON.stringify(element,0,2)}
            </pre>

            <Link onClick={()=>submitHandler(element.id)} key={idx} to={{ pathname: "/buyproduct/"+element.id, state: element }}>
                Buy
            </Link>

            </>
        }) }
                    
    </div>
  )
}