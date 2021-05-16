import { useState } from 'react';
import './App.css';
const axios = require('axios');

const initialState = {
    username: "",
    cash: 0, 
    email: "", 
    role: "", 
    password: "" 
};

function App() {

  const [formState, setFormState] = useState(initialState);

  const submitHandler = event => {
    event.preventDefault();
    console.log(formState);
    postData();
  };

  const postData = () => {
    const json = JSON.stringify(formState);
    axios.post(
      'http://localhost:9000/api/v1/users/register', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  };

  return (
    <div className="App">
      <header className="App-header">

      <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Name"
        value={formState.name}
        onChange={e => {
          setFormState({ ...formState, name: e.target.value });
        }}
      />
      <input
        type="email"
        placeholder="Email"
        value={formState.email}
        onChange={e => {
          setFormState({ ...formState, email: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Password"
        value={formState.password}
        onChange={e => {
          setFormState({ ...formState, password: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Role"
        value={formState.role}
        onChange={e => {
          setFormState({ ...formState, role: e.target.value });
        }}
      />
      <input
        type="number"
        placeholder="Cash"
        value={formState.cash}
        onChange={e => {
          setFormState({ ...formState, cash: e.target.value });
        }}
      />
      <button>Confirm</button>
    </form>
      </header>
    </div>
  );
}

export default App;
