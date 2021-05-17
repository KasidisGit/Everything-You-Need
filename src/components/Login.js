import loginImg from '../images/login-img.jpg';
import React, { useState } from 'react';
import { Redirect } from 'react-router'

const axios = require('axios');
const accessTokenStorage = window.localStorage;

const initialState = {
  username: "",
  password: "" 
};

export default function Login() {

  const [formState, setFormState] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = event => {
    event.preventDefault();
    login();
  };

  const login = async () => {
    const json = JSON.stringify(formState);
    await axios.post(
      'http://localhost:9000/api/v1/users/login', json, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      }).then(res => {
        setSubmitted(true)
        accessTokenStorage.setItem('UserAccessToken',res.data.accessToken)
      }).catch((err)=>{
        console.error(err)
      })
  };

  if (submitted) {
    return <Redirect push to={{
      pathname: '/listproduct',
    }}
    />
  } 

  return (
    <div className="container">
      <div className="signin-content">
          <div className="signin-image">
              <img className="figure" src={loginImg} alt=""/>
              <p className="signup-image-link">Don't have an account yet?</p>
              <a href="/register" className="signup-image-link"><u>Register</u></a>
          </div>
          <div className="signin-form">
              <h2 className="title-head-log">Welcome</h2>
              <div className="title-text">Please log in</div>
              <form onSubmit={submitHandler} className="register-form">
                  <div className="form-group">
                      <label for="your-name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                      <input
                        type="text"
                        placeholder="Username"
                        value={formState.username}
                        onChange={e => {
                          setFormState({ ...formState, username: e.target.value });
                        }}
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="your-pass"><i className="zmdi zmdi-lock"></i></label>
                      <input
                        type="password"
                        placeholder="Password"
                        value={formState.password}
                        onChange={e => {
                          setFormState({ ...formState, password: e.target.value });
                        }}
                      />
                  </div>
                  <div className="form-group">
                      <input type="checkbox" className="agree-term" id="remember-me" />
                      <label for="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                  </div>
                  <div className="form-group form-button">
                      <input type="submit" name="signin" id="signin" className="form-submit form-btn-color" value="Log in"/>
                  </div>
              </form>
          </div>
      </div>
    </div>
  );
}


