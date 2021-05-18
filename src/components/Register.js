import { useState } from 'react';
import { Redirect } from 'react-router'
import { Dropdown } from "semantic-ui-react";
import registerImg from '../images/register-img.jpg';
import adminIco from '../images/mufasa.png';
import userIco from '../images/simba.png'

const axios = require('axios');

const initialState = {
    username: "",
    cash: 0, 
    email: "", 
    role: "", 
    password: "" 
};

export default function Register() {

  const [formState, setFormState] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = event => {
    event.preventDefault();
    postData();
  };

  const postData = () => {
    const json = JSON.stringify(formState);
    axios.post(
      'http://localhost:9000/api/v1/users/register', json, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      });
  };

  const roleOptions = [
    {
      image: { src: adminIco },
      text: "Admin",
      value: "admin"
    },
    {
      image: { src: userIco},
      text: "User",
      value: "user"
    },
  ];

  if (submitted) {
    return <Redirect push to={{
      pathname: '/login',
    }}
    />
  } 

  return (
    <div className="container">
      <div className="signup-content">
        <div className="signup-form">
            <h2 className="title-head-re">Register</h2>
            <form onSubmit={submitHandler} className="register-form">
              <div className="form-group">
                <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                <input
                  type="text"
                  required
                  name="name" id="name"
                  placeholder="Username"
                  value={formState.username}
                  onChange={e => {
                    setFormState({ ...formState, username: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label for="email"><i className="zmdi zmdi-email"></i></label>
                <input
                  type="email"
                  required
                  name="email" id="email"
                  placeholder="Email"
                  value={formState.email}
                  onChange={e => {
                    setFormState({ ...formState, email: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                <input
                  type="password"
                  required
                  name="pass" id="pass"
                  placeholder="Password"
                  value={formState.password}
                  onChange={e => {
                  setFormState({ ...formState, password: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label for="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                <input
                  type="password"
                  required
                  name="re-pass" id="re-pass"
                  placeholder="Repeat your password"
                />
              </div>
              <div className="form-drop">
                <Dropdown
                  placeholder="Select role"
                  required
                  selection
                  options={roleOptions}
                  value={formState.role}
                  onChange={e => {
                    setFormState({ ...formState, role: e.target.value });
                  }}
                />
              </div>
              <div className="form-group form-button">
                  <input type="submit" name="register" id="register" className="form-submit form-btn-color" value="Register"/>
              </div>
            </form>
        </div>
        <div className="signup-image">
          <img className="figure" src={registerImg} alt=""/>
          <p className="signup-image-link">Already have an account?</p>
          <a href="/login" className="signup-image-link"><u>Login</u></a>
        </div>
      </div>  
    </div>
  );
}
