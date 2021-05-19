import loginImg from '../images/login-img.jpg';
import React, { useState } from 'react';
import { Redirect } from 'react-router'
import authService from '../services/authentication.service'

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await authService.login(username, password);
      setSubmitted(true)
    } catch(error) {
      alert("Username or password is incorrect")
    }
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
                        required
                        placeholder="Username"
                        value={username}
                        onChange={e => {
                          setUsername(e.target.value);
                        }}
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="your-pass"><i className="zmdi zmdi-lock"></i></label>
                      <input
                        type="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={e => {
                          setPassword(e.target.value);
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
