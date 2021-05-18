import { useState, useEffect } from 'react';
import { useLocation, useParams, Redirect } from 'react-router-dom';
  
const axios = require('axios');

const initialState = {
    username: "",
    cash: "", 
    email: "", 
    role: "", 
    password: "" 
};

export default function UserProfile() {

    const [formState, setFormState] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const location = useLocation()
    const {userId} = useParams()
    const x = location.pathname.split('/')
    const productId = x[x.length-1]
  
    const submitHandler = (event) => {
      event.preventDefault();
      update(); 
    };
  
    useEffect( () => {
      const accessToken =  JSON.parse(localStorage.getItem('user')).accessToken
      axios.get(
      'http://localhost:9000/api/v1/users/'+ userId, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ accessToken,
          'Access-Control-Allow-Origin' : '*'
        },
        withCredentials: true
        
      }).then(user => {
        setSelectedUser(user.data)
      })
      .catch(err => {
          console.error(err)
      });
  
      } , [])
  
    const update = () => {
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
      console.log(json)
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
                {/* <input
                        type="text"
                        placeholder="new admin, user"
                        value={formState.role}
                        onChange={e => {
                          setFormState({ ...formState, role: e.target.value });
                        }} 
                  /> */}
                <input
                        type="email"
                        required
                        placeholder="new email"
                        value={formState.email}
                        onChange={e => {
                          setFormState({ ...formState, email: e.target.value });
                        }} 
                  />
                <input
                        type="number"
                        required
                        placeholder="new cash"
                        value={formState.cash}
                        onChange={e => {
                          setFormState({ ...formState, cash: e.target.value });
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