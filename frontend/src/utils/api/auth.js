import getInstance from './instance';

export default function authApi() {
  const axios = getInstance();

  return {
    login: ({ email, password }) =>
      axios
        .post('/account/login', { email, password })
        .then((response) => response.data)
        .then((data) => {
          localStorage.setItem('jwt-token', JSON.stringify(data));
        }),
    signup: ({ email, name, password, age }) =>
      axios
        .post('/account/signup', { email, name, password, age })
        .then((response) => response.data)
        .then((data) => {
          localStorage.setItem('jwt-token', JSON.stringify(data));
        }),
  };
}
