import { useState } from 'react';

const axios = require('axios');
const accessTokenStorage = window.localStorage;

const initialState = {
  username: "",
  cash: 0, 
  email: "", 
  password: ""
};

export default function Product() {

  const [formState, setFormState] = useState(initialState);

  const submitHandler = event => {
    event.preventDefault();
    postData();
  };

  const postData = () => {
    const json = JSON.stringify(formState);
    axios.post(
      'http://localhost:9000/api/v1/products', json, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ accessTokenStorage.getItem('UserAccessToken') ,
          'Access-Control-Allow-Origin' : '*'
        }
      });
  };

  return (
    <div className="AddProduct">

    <form onSubmit={submitHandler}>
    <input
      type="text"
      placeholder="Name"
      value={formState.name}
      onChange={e => {
        setFormState({ ...formState, name: e.target.value });
      }}
    />
    <input
      type="text"
      placeholder="Description"
      value={formState.description}
      onChange={e => {
        setFormState({ ...formState, description: e.target.value });
      }}
    />
    <input
      type="number"
      placeholder="Available"
      value={formState.available}
      onChange={e => {
        setFormState({ ...formState, available: e.target.value });
      }}
    />
    <input
      type="number"
      placeholder="Price"
      value={formState.price}
      onChange={e => {
        setFormState({ ...formState, price: e.target.value });
      }}
    />
    <button type="submit">Confirm</button>
  </form>
  
  </div>
  )
}