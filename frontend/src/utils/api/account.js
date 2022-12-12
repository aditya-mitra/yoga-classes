import getInstance from './instance';

export default function accountApi() {
  const axios = getInstance();

  return {
    retrieve: () => axios.get('/account').then((response) => response.data),
  };
}
