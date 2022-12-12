import getInstance from './instance';

export default function batchApi() {
  const axios = getInstance();

  return {
    getOne: (id) => axios.get(`account/batch/${id}`).then((response) => response.data),
    getAll: () => axios.get('account/batch').then((response) => response.data),
  };
}
