import { useEffect, useState } from 'react';

const axios = require('axios');
const accessTokenStorage = window.localStorage;

export default function Product() {

  const [products, setProducts] = useState([]);

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
        { products.map(element => {
            return <pre>{JSON.stringify(element,0,2)}</pre>
        }) }
    </div>
  )
}