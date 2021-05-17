import axios from 'axios';

const API_URL = "http://localhost:9000/api/v1/users/"

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL +"login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  currentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  logout() {
    localStorage.removeItem("user")
  }

  register(data) {
    return axios.post(API_URL+"register", data)
  }
}

export default new AuthService()