import { useState } from 'react';
import { Link } from 'react-router-dom';

const axios = require('axios');
const accessTokenStorage = window.localStorage;

const initialState = {
    number: 0
};

export default function BuyProduct() {
  
  const [formState, setFormState] = useState(initialState);
  
  const submitHandler = event => {
    event.preventDefault();
    postData();
  };

  const postData = () => {
    const json = JSON.stringify(formState);
    axios.post(
      'http://localhost:9000/api/v1/products/buy/'+accessTokenStorage.getItem('productId'), json, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ accessTokenStorage.getItem('UserAccessToken') ,
          'Access-Control-Allow-Origin' : '*'
        }
      });
  };

  return (
    <div className="AddProduct">

    <form onSubmit={submitHandler} >
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
  <Link to={{pathname: '/listproduct'}}>
      back
  </Link>
  </div>
  )
}