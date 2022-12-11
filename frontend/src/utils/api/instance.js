import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export default function getInstance() {
  const tokenStr = localStorage.getItem('jwt-token');

  let token = null;
  if (tokenStr) {
    token = JSON.parse(tokenStr).token;
  }

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosInstance;
}
