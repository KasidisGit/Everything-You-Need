import { useState, useEffect } from 'react';
import { useLocation,  Redirect } from 'react-router-dom';
import authService from '../services/authentication.service'

const axios = require('axios');

const initialState = {
    name: "",
    description: "", 
    available: "", 
    price: ""
};

export default function EditProduct() {

    const [formState, setFormState] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const location = useLocation()
    const x = location.pathname.split('/')
    const productId = x[x.length-1]
  
    const submitHandler = (event) => {
      event.preventDefault();
      update(); 
    };

    const deleteHandler = (event) => {
        event.preventDefault();
        deleteProduct(); 
    };
  
  
    useEffect( () => {
      axios.get(
      'http://localhost:9000/api/v1/products/'+ productId, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        },
        withCredentials: true

      }).then(product => {
          setSelectedProduct(product.data)
      })
      .catch(err => {
          console.error(err)
      });
  
      } , [])
  
    const update = async () => {
      const accessToken =  JSON.parse(localStorage.getItem('user')).accessToken
      if(!formState.name){
        formState.name =  selectedProduct.name
      }
      if(!formState.description){
        formState.description =  selectedProduct.description
      }
      if(!formState.available){
        formState.available = selectedProduct.available
      }else{
        let avail = parseFloat(selectedProduct.available) 
        let add_avail = parseFloat(formState.available)
        formState.available = avail + add_avail

      }
      if(!formState.price){
        formState.price =  selectedProduct.price
      }
      const {csrfToken} = await authService.getCsrf()
      setFormState({ ...formState, _csrf: csrfToken })

      const json = JSON.stringify(formState);
      axios.put(
        'http://localhost:9000/api/v1/products/'+productId, json, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ accessToken ,
            'Access-Control-Allow-Origin' : '*',
            'CSRF-Token': csrfToken
          },
          withCredentials: true
        })
        .then((response)=>{
          alert('edit successfully')
          setSubmitted(true)
        }
          ).catch(err =>{
              console.error(err)
          });
    };
  
    const deleteProduct = () => {
    const accessToken =  JSON.parse(localStorage.getItem('user')).accessToken
    axios.delete(
        'http://localhost:9000/api/v1/products/'+productId, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ accessToken ,
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
        <>
    <div id="main" className="buy-body">
    <section id="leftEdit">
    <h3 className="old-product-name">Product Information</h3>
    <div className="product-name-edit">Name: {selectedProduct.name}</div>
    <div className="product-des-edit">Description: {selectedProduct.description}</div>
    <div className="product-avail-edit">Available: {selectedProduct.available}</div>
    <div className="product-price-edit">Price: {selectedProduct.price}</div>
    </section>
    <section id="rightEdit">
    <a href="/listproduct"><i className="back-icon zmdi zmdi-long-arrow-left"></i></a>
          <form onSubmit={(e) => submitHandler(e)}>


              <div id="amount-edit">
                <input
                        type="text"
                        placeholder="new name"
                        value={formState.name}
                        onChange={e => {
                          setFormState({ ...formState, name: e.target.value });
                        }} 
                  />
                <input
                        type="text"
                        placeholder="new description"
                        value={formState.description}
                        onChange={e => {
                          setFormState({ ...formState, description: e.target.value });
                        }} 
                  />
                <input
                        type="number"
                        placeholder="add available"
                        value={formState.available}
                        onChange={e => {
                          setFormState({ ...formState, available: e.target.value });
                        }} 
                  />
                <input
                        type="number"
                        placeholder="new price"
                        value={formState.price}
                        onChange={e => {
                          setFormState({ ...formState, price: e.target.value });
                        }} 
                  />
              </div>

              <div id="inline">
              <div id="button-edit">
                  <button className="btn-hover color-1" type="submit">Edit</button>
              </div>
              <div id="button-delete">
                  <button onClick={(e) => deleteHandler(e)} className="btn-hover color-2" >Delete</button>
              </div>
              </div>
              
          </form>
          </section>

  
      </div>
    </>
    )
}