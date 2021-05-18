import { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
  
const axios = require('axios');
const accessTokenStorage = window.localStorage;

const initialState = {
    number: 0
};

export default function BuyProduct() {
  const [formState, setFormState] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const {productId} = useParams()

  const submitHandler = (event) => {
    event.preventDefault();
    buy(); 
  };

  const buy = () => {
    const json = JSON.stringify(formState);
    axios.post(
      'http://localhost:9000/api/v1/products/buy/'+productId, json, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ accessTokenStorage.getItem('UserAccessToken') ,
          'Access-Control-Allow-Origin' : '*'
        }
      })
      .then(
          setSubmitted(true)
        ).catch(err =>{
            console.error(err)
        });
  };

  if (submitted) {
    return <Redirect to={{
      pathname: '/listproduct',
      state: {status: 'ok'}
        }}
    />
  }  

  return (
    <div className="AddProduct">

    <form onSubmit={(e) => submitHandler(e)} >
    <input
      type="number"
      placeholder="number"
      value={formState.number}
      onChange={e => {
        setFormState({ ...formState, number: e.target.value });
      }}
    />
    <button type="submit">Confirm</button>
  </form>
  </div>
  )
}