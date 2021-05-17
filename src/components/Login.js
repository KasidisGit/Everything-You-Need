import loginImg from '../images/login-img.jpg';
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
    <div class="container">
      <div class="signin-content">
          <div class="signin-image">
              <img src={loginImg} alt=""/>
              <a href="/register" class="signup-image-link"><u>Create an account</u></a>
          </div>
          <div class="signin-form">
              <h2 class="title-head">Welcome</h2>
              <div class="title-text">Please log in</div>
              <form onSubmit={submitHandler} class="register-form">
                  <div class="form-group">
                      <label for="your-name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                      <input
                        type="text"
                        placeholder="Username"
                        value={formState.username}
                        onChange={e => {
                          setFormState({ ...formState, username: e.target.value });
                        }}
                      />
                  </div>
                  <div class="form-group">
                      <label for="your-pass"><i class="zmdi zmdi-lock"></i></label>
                      <input
                        type="password"
                        placeholder="Password"
                        value={formState.password}
                        onChange={e => {
                          setFormState({ ...formState, password: e.target.value });
                        }}
                      />
                  </div>
                  <div class="form-group">
                      <input type="checkbox" class="agree-term" />
                      <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                  </div>
                  <div class="form-group form-button">
                      <input type="submit" name="signin" id="signin" class="form-submit" value="Log in"/>
                  </div>
              </form>
          </div>
      </div>
    </div>
  );
}


