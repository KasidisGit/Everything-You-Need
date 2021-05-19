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
    const [selectedUserInit, setSelectedUserInitial] = useState({})
    const userId = currentUser.id

    const submitHandler = (event) => {
      event.preventDefault();
      updateUser(); 
    };

    const cancelHandler = (event) => {
      event.preventDefault();
      setSelectedUser(selectedUserInit);
      setFormState(initialState)
    };
  
    useEffect( () => {
      axios.get(
      'http://localhost:9000/api/v1/users/me', {
        withCredentials: true
        
      }).then(user => {
        setSelectedUser(user.data)
        setSelectedUserInitial(user.data)
      })
      .catch(err => {
          console.error(err)
      });
  
      } , [])
  
    const updateUser = () => {
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
      const json = JSON.stringify(formState);
      axios.put(
        'http://localhost:9000/api/v1/users/'+userId, json, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ accessToken ,
            'Access-Control-Allow-Origin' : '*'
          },
          withCredentials: true
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
      <div id="profile-main">
        <a href="/listproduct"><i className="back-icon zmdi zmdi-long-arrow-left back-place"></i></a>
        <h3 className="old-product-name">User Information</h3>
        <div className="font-normal">Username: {selectedUser.username}</div>
        <div className="font-normal">Role: {selectedUser.role}</div>
        <div className="font-normal">Email: {selectedUser.email}</div>
        <div className="font-normal">Cash: {parseFloat(selectedUser.cash).toFixed(2)} ฿</div>
        <h3 className="old-product-name">Edit Information</h3>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="font-normal">
            <input
              type="email"
              placeholder="New email"
              value={formState.email}
              onChange={e => {
                setFormState({ ...formState, email: e.target.value });
                setSelectedUser({ ...selectedUser, email: e.target.value });
              }} 
            />
            <input
              type="number"
              placeholder="New cash"
              value={formState.money}
              onChange={e => {
                setFormState({ ...formState, money: e.target.value });
                setSelectedUser({ ...selectedUser, money: e.target.value });
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