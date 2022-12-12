import getInstance from './instance';

export default function paymentApi() {
  const axios = getInstance();

  return {
    getAll: () => axios.get('/payment').then((response) => response.data),
    create: ({ batchId, amount }) =>
      axios
        .post('/payment/create', { batch: batchId, amount })
        .then((response) => response.data),
  };
}
