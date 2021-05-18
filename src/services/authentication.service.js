import { getRoles } from '@testing-library/dom';
import axios from 'axios';

const API_URL = "http://localhost:9000/api/v1/users/"

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL +"login", {
        username,
        password
      },
      {
        withCredentials: true
      })
      .then(response => {
        if (response.data.userData) {
          localStorage.setItem("user", JSON.stringify(response.data.userData));
        }

        return response.data;
      });
  }

  currentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  isAdmin() {
    const user = this.currentUser()
    console.log(user)
    // return user.userData.role === "admin"
  }

  logout() {
    localStorage.removeItem("user")
  }

  register(data) {
    return axios.post(API_URL+"register", data)
  }
}

export default new AuthService()