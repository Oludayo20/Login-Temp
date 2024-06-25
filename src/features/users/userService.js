import axios from 'axios';

const API_URL = 'http://localhost:4000/users';

const register = (username, email, password) => {
  return axios.post(API_URL, {
    username,
    email,
    password
  });
};

const authService = { register };
