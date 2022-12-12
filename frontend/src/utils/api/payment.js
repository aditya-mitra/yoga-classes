import getInstance from './instance';

export default function accountApi() {
  const axios = getInstance();

  return {
    getAll: () => axios.get('/payment').then((response) => response.data),
  };
}
