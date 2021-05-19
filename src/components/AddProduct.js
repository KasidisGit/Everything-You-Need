import { useEffect, useState } from 'react';
import { Redirect } from 'react-router'
import addProductImg from '../images/add-product.jpg';
import authService from '../services/authentication.service'

const axios = require('axios');

const initialState = {
    name: "",
    description: "", 
    available: "", 
    price: "",
    _csrf: ""
};



export default function Product() {

  const [formState, setFormState] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [csrf, setCsrf] = useState('')
  const submitHandler = event => {
    event.preventDefault();
    postData();
  };

  const postData = async () => {
    const {csrfToken} = await authService.getCsrf()
    setFormState({ ...formState, _csrf: csrfToken })
    const json = await JSON.stringify(formState);

    axios.post(
      'http://localhost:9000/api/v1/products', json, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          'CSRF-Token': csrfToken
        },
        withCredentials: true
      }).then((response) => {
        alert('add product succesfully')
        setSubmitted(true)

      }
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
    <div className="container">
      <div className="add-product-content">
          <div className="signin-form">
            <h2 className="title-head-log">New Product</h2>
            <div className="title-text">Add information below to add a new product.</div>
            <form onSubmit={(e) => submitHandler(e)} className="register-form">
                <div className="form-group">
                  <label><i className="zmdi zmdi-flower-alt"></i></label>
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
                  <label><i className="zmdi zmdi-comment-text"></i></label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Product Description"
                    value={formState.description}
                    onChange={e => {
                      setFormState({ ...formState, description: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label><i className="zmdi zmdi-shopping-cart-plus"></i></label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Stock Available"
                    value={formState.available}
                    onChange={e => {
                      setFormState({ ...formState, available: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label><i className="zmdi zmdi-label-heart"></i></label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Product Price"
                    value={formState.price}
                    onChange={e => {
                      setFormState({ ...formState, price: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group form-button">
                  <button type="submit" className="btn-hover10 color-10">Add</button>
                </div>
            </form>
          </div>
          <div className="add-product-image">
            <img className="figure" src={addProductImg} alt=""/>
          </div>
      </div>
  </div>
  )
}