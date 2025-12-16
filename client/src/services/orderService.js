import api from './api';

export const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getUserOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  updateOrderToPaid: async (id, paymentResult) => {
    const response = await api.put(`/orders/${id}/pay`, paymentResult);
    return response.data;
  },

  processStripePayment: async (amount) => {
    const response = await api.post('/payments/stripe', { amount });
    return response.data;
  },

  verifyStripePayment: async (paymentIntentId) => {
    const response = await api.post('/payments/stripe/verify', { paymentIntentId });
    return response.data;
  },

  getStripeConfig: async () => {
    const response = await api.get('/payments/stripe/config');
    return response.data;
  },
};
