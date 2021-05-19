import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../services/authentication.service';

const axios = require('axios');

const initialState = {
    username: "",
    cash: "", 
    email: "", 
    role: "", 
    password: "" 
};

const currentUser = authService.currentUser();

export default function UserProfile() {

    const [formState, setFormState] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const userId = currentUser.id
    const submitHandler = (event) => {
      event.preventDefault();
      update(); 
    };
  
    useEffect( () => {
      axios.get(
      'http://localhost:9000/api/v1/users/me', {
        withCredentials: true
        
      }).then(user => {
        setSelectedUser(user.data)
      })
      .catch(err => {
          console.error(err)
      });
  
      } , [])
  
    const update = async () => {
      const accessToken =  JSON.parse(localStorage.getItem('user')).accessToken
      formState.username = JSON.parse(localStorage.getItem('user')).username
      if(!formState.email){
        formState.email =  selectedUser.email
      }
      if(!formState.cash){
        formState.cash =  selectedUser.cash
      }
      if(!formState.role){
          formState.role = selectedUser.role
      }
      const {csrfToken} = await authService.getCsrf()
      setFormState({ ...formState, _csrf: csrfToken })
      const json = JSON.stringify(formState);

      axios.put(
        'http://localhost:9000/api/v1/users/'+userId, json, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ accessToken ,
            'Access-Control-Allow-Origin' : '*',
            'CSRF-Token': csrfToken
          },
          withCredentials: true
        })
        .then( (response) => {
          alert('Update profile successful')
          setSubmitted(true)
        }
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
    <h3 className="old-product-name">User Information</h3>
    <div className="product-name-edit">Username: {selectedUser.username}</div>
    <div className="product-role-edit">Role: {selectedUser.role}</div>
    <div className="product-avail-edit">Email: {selectedUser.email}</div>
    <div className="product-des-edit">Cash: {parseFloat(selectedUser.cash).toFixed(2)} ฿</div>
    <a href="/listproduct"><i className="back-icon zmdi zmdi-long-arrow-left"></i></a>
    </section>
          <form onSubmit={(e) => submitHandler(e)}>
          <section id="right">

              <div id="amount">
                <input
                        type="email"
                        placeholder="new email"
                        value={formState.email}
                        onChange={e => {
                          setFormState({ ...formState, email: e.target.value });
                        }} 
                  />
                <input
                        type="number"
                        placeholder="new cash"
                        value={formState.money}
                        onChange={e => {
                          setFormState({ ...formState, money: e.target.value });
                        }} 
                  />
              </div>
              
              <div id="inline">
              <div id="button-edit">
                  <button className="btn-hover color-1" type="submit">Edit</button>
              </div>
              </div>
              </section>
          </form>

      </div>
    </>
    )
}