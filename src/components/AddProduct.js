import { useState } from 'react';
import { Redirect } from 'react-router'
const axios = require('axios');

const initialState = {
    name: "",
    description: "", 
    available: "", 
    price: ""
};

export default function Product() {

  const [formState, setFormState] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = event => {
    event.preventDefault();
    postData();
  };
  const postData = () => {
    const accessToken =  JSON.parse(localStorage.getItem('user')).accessToken
    const json = JSON.stringify(formState);
    axios.post(
      'http://localhost:9000/api/v1/products', json, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ accessToken ,
          'Access-Control-Allow-Origin' : '*'
        },
        withCredentials: true
      }).then(
          setSubmitted(true)
      ).catch((err) =>{
          console.log(err)
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
    <div id="main" className="buy-body">
    <section id="leftEdit">
    <h1>Add Product</h1>
      <form onSubmit={(e) => submitHandler(e)}>
      <div id="form-add">
        <div className="form-group">
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
        
        <button type="submit" className="btn btn-primary btn-block">Add</button>
      </div>
      </form>
    </section>
    </div>
  )
}