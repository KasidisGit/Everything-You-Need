import React, { useState } from 'react';

const axios = require('axios');
const accessTokenStorage = window.localStorage;

const initialState = {
  username: "",
  password: "" 
};

export default function Login() {

  const [formState, setFormState] = useState(initialState);

  const submitHandler = event => {
    event.preventDefault();
    postData();
  };

  const postData = async () => {
    const json = JSON.stringify(formState);
    let res = await axios.post(
      'http://localhost:9000/api/v1/users/login', json, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      });
    accessTokenStorage.setItem('UserAccessToken',res.data.accessToken)
  };

    return (
      <div className="Login">

      <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="username"
        value={formState.username}
        onChange={e => {
          setFormState({ ...formState, username: e.target.value });
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={formState.password}
        onChange={e => {
          setFormState({ ...formState, password: e.target.value });
        }}
      />
      <button type="submit">Login</button>
    </form>
    
    </div>
    )
}


