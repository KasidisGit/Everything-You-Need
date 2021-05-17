import { useState } from 'react';
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

  return (
    <div class="container">
      <div class="signup-content">
        <div class="signup-form">
            <h2 class="title-head-re">Register</h2>
            <form onSubmit={submitHandler} class="register-form">
              <div class="form-group">
                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                <input
                  type="text"
                  name="name" id="name"
                  placeholder="Username"
                  value={formState.username}
                  onChange={e => {
                    setFormState({ ...formState, username: e.target.value });
                  }}
                />
              </div>
              <div class="form-group">
                <label for="email"><i class="zmdi zmdi-email"></i></label>
                <input
                  type="email"
                  name="email" id="email"
                  placeholder="Email"
                  value={formState.email}
                  onChange={e => {
                    setFormState({ ...formState, email: e.target.value });
                  }}
                />
              </div>
              <div class="form-group">
                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                <input
                  type="password"
                  name="pass" id="pass"
                  placeholder="Password"
                  value={formState.password}
                  onChange={e => {
                  setFormState({ ...formState, password: e.target.value });
                  }}
                />
              </div>
              <div class="form-group">
                <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                <input
                  type="password"
                  name="re-pass" id="re-pass"
                  placeholder="Repeat your password"
                />
              </div>
              <div>
                <Dropdown
                  placeholder="Select role"
                  selection
                  options={roleOptions}
                  value={formState.role}
                  onChange={e => {
                    setFormState({ ...formState, role: e.target.value });
                  }}
                />
              </div>
              <div class="form-group form-button">
                  <input type="submit" name="register" id="register" class="form-submit" value="Register"/>
              </div>
            </form>
        </div>
        <div class="signup-image">
          <img class="figure" src={registerImg} alt=""/>
          <p class="signup-image-link">Already have an account</p>
          <a href="/login" class="signup-image-link"><u>Login</u></a>
        </div>
      </div>  
    </div>
  );
}
