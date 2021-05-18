import { useEffect, useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';

const axios = require('axios');
const accessTokenStorage = window.localStorage;
const LoadingComponent = () => <div> Loading... </div>  

export default function ListProduct() {

  const location = useLocation()
  const history = useHistory()
  const [products, setProducts] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [productId, setProductId] = useState("")
  const [isLoaded, setIsLoaded] = useState(true)

  const submitHandler = (productId) => {
    setSubmitted(true)
    setProductId(productId)
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

  if (submitted) {
    return <Redirect to={{
      pathname: '/buyproduct/'+productId,
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
            <pre >
                {JSON.stringify(element,0,2)}
            </pre>
            <button onClick={() => submitHandler(element.id)}>Buy</button>
            </div>
        }) }

    </div>
  )}
}