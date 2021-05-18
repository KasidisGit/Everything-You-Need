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
    <section>
    <h3>Add Product</h3>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Product Name"
            value={formState.name}
            onChange={e => {
              setFormState({ ...formState, name: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            className="form-control"
            type="text"
            placeholder="Description"
            value={formState.description}
            onChange={e => {
              setFormState({ ...formState, description: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Available</label>
          <input
            className="form-control"
            type="number"
            placeholder="Available"
            value={formState.available}
            onChange={e => {
              setFormState({ ...formState, available: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            className="form-control"
            type="number"
            placeholder="Price"
            value={formState.price}
            onChange={e => {
              setFormState({ ...formState, price: e.target.value });
            }}
          />
        </div>
      </form>
    <button type="submit" className="btn btn-primary btn-block">Add Product</button>
    </section>
  )
}