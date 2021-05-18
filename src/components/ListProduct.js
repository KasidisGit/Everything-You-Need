import { useEffect, useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';

const axios = require('axios');
const LoadingComponent = () => <div> Loading... </div>  

export default function ListProduct() {

  const location = useLocation()
  const history = useHistory()
  const [products, setProducts] = useState([]);
  const [buySubmitted, setBuySubmitted] = useState(false);
  const [editSubmitted, setEditSubmitted] = useState(false);
  const [productId, setProductId] = useState("")
  const [isLoaded, setIsLoaded] = useState(true)

  const buyHandler = (productId) => {
    setBuySubmitted(true)
    setProductId(productId)
  };

  const editHandler = (productId) => {
    setEditSubmitted(true)
    setProductId(productId)
  };

  useEffect( () => {
        const accessToken =  JSON.parse(localStorage.getItem('user')).accessToken
        axios.get(
        'http://localhost:9000/api/v1/products', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ accessToken,
            'Access-Control-Allow-Origin' : '*'
          }
          
        }).then(product => {
            setProducts(product.data.rows)
            setIsLoaded(false);
        })
        .catch(err => {
            console.error(err)
        });

  } , [])

  if ( location.state ){
    if( location.state.status === 'ok'){
        history.replace('/listproduct',{})
        window.location.reload()
    }
  }

  if (buySubmitted) {
    return <Redirect to={{
      pathname: '/buyproduct/'+productId,
    }}
    />
  } 
  if (editSubmitted) {
    return <Redirect to={{
      pathname: '/editproduct/'+productId,
    }}
    />
  } 
  if (isLoaded){
      return < LoadingComponent />
  }
  else{
  return (
    <div className="ListProduct">
        { products.map((element, idx) => {

            return <div key={idx}>
            <pre>
                {JSON.stringify(element,0,2)}
            </pre>
            <button onClick={() => buyHandler(element.id)}>Buy</button>
            <button onClick={() => editHandler(element.id)}>Edit</button>
        </div>
    })}
    </div>
  )}
}