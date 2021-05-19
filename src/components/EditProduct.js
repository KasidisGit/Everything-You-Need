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

    const [formState, setFormState] = useState(initialState)
    const [submitted, setSubmitted] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({})
    const [selectedProductInit, setSelectedProductInitial] = useState({})
    const location = useLocation()
    const x = location.pathname.split('/')
    const productId = x[x.length-1]
  
    const submitHandler = (event) => {
      event.preventDefault();
      updateProduct(); 
    };

    const deleteHandler = (event) => {
        event.preventDefault();
        deleteProduct(); 
    };

    const cancelHandler = (event) => {
      event.preventDefault();
      setSelectedProduct(selectedProductInit);
      setFormState(initialState)
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
          setSelectedProductInitial(product.data)
      })
      .catch(err => {
          console.error(err)
      });
  
      } , [])
  
    const updateProduct = async () => {
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
        let avail = parseFloat(selectedProductInit.available) 
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
        }, withCredentials: true
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
    <div id="edit-main">
      <a href="/listproduct"><i className="back-icon zmdi zmdi-long-arrow-left back-place"></i></a>
      <h3 className="old-product-name">Product Information</h3>
      <div className="font-normal">Name: {selectedProduct.name}</div>
      <div className="font-normal">Description: {selectedProduct.description}</div>
      <div className="font-normal">Available: { (parseInt(selectedProductInit.available) + parseInt(formState.available) || parseInt(selectedProductInit.available)) }</div>
      <div className="font-normal">Price: {selectedProduct.price}</div>
      <div id="button-delete">
        <button onClick={(e) => deleteHandler(e)} className="btn-hover2 color-3" >Delete</button>
      </div>
      <h3 className="old-product-name">New Product Information</h3>
      <form onSubmit={(e) => submitHandler(e)} id="editForm">
        <div className="font-normal" >
          <input
          id="editForm"
              type="text"
              placeholder="New Product Name"
              value={formState.name}
              onChange={e => {
                setFormState({ ...formState, name: e.target.value });
                setSelectedProduct({ ...selectedProduct, name: e.target.value });
              }} 
          />
          <input
              type="text"
              placeholder="New Description"
              value={formState.description}
              onChange={e => {
                setFormState({ ...formState, description: e.target.value });
                setSelectedProduct({ ...selectedProduct, description: e.target.value });
              }} 
          />
          <input
              type="number"
              placeholder="New Available"
              value={formState.available}
              onChange={e => {
                setFormState({ ...formState, available: e.target.value });
                setSelectedProduct({ ...selectedProduct, available: e.target.value });
              }} 
          />
          <input
              type="number"
              placeholder="New Price"
              value={formState.price}
              onChange={e => {
                setFormState({ ...formState, price: e.target.value });
                setSelectedProduct({ ...selectedProduct, price: e.target.value });
              }} 
          />
        </div>
        <div id="group-button">
            <button className="btn-hover2 color-4" type="submit">Edit</button>
            <button className="btn-hover2 color-2" onClick={(e) => cancelHandler(e)}>Clear</button>
        </div>
      </form>
    </div>
    )
}