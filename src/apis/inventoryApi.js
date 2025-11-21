import api from './axiosInstance';

// Get all inventory items
export const getAllInventory = async () => {
  const response = await api.get('/gateway/inventory'); // ← ADD /gateway/
  return response.data; // Returns: { data: [...], message, errorCode }
};

// You can add more inventory-related API functions here
export const getInventoryById = async (id) => {
  const response = await api.get(`/gateway/inventory/${id}`);
  return response.data;
};

export const createInventoryItem = async (itemData) => {
  const response = await api.post('/gateway/inventory', itemData);
  return response.data;
};

export const updateInventoryItem = async (id, itemData) => {
  const response = await api.put(`/gateway/inventory/${id}`, itemData);
  return response.data;
};

export const deleteInventoryItem = async (id) => {
  const response = await api.delete(`/gateway/inventory/${id}`);
  return response.data;
};