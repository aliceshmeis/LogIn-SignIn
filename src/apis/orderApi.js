import api from './axiosInstance';

// Get all orders (Admin only)
export const getAllOrders = async () => {
  const response = await api.get('/gateway/orders');
  return response.data;
};

// Get current user's orders
export const getMyOrders = async () => {
  const response = await api.get('/gateway/orders/my-orders');
  return response.data;
};

// Get order by ID
export const getOrderById = async (orderId) => {
  const response = await api.get(`/gateway/orders/${orderId}`);
  return response.data;
};

// Create new order
export const createOrder = async (orderData) => {
  const response = await api.post('/gateway/orders', orderData);
  return response.data;
};

// Update order (Admin only)
export const updateOrder = async (orderId, orderData) => {
  const response = await api.put(`/gateway/orders/${orderId}`, orderData);
  return response.data;
};

// Delete order (Admin only)
export const deleteOrder = async (orderId) => {
  const response = await api.delete(`/gateway/orders/${orderId}`);
  return response.data;
};

// Cancel order
export const cancelOrder = async (orderId) => {
  const response = await api.patch(`/gateway/orders/${orderId}/cancel`);
  return response.data;
};