import api from './axiosInstance';

// Get all inventory items
export const getAllInventory = async () => {
  const response = await api.get('/inventory');
  return response.data; // Returns: { data: [...], message, errorCode }
};

// Get inventory item by ID
export const getInventoryById = async (id) => {
  const response = await api.get(`/inventory/${id}`);
  return response.data;
};
