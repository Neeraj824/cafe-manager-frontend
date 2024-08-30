import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getCafes = async (location) => {
  const response = await axios.get(`${API_URL}/cafes`, { params: { location } });
  return response.data;
};

export const createCafe = async (cafeData) => {
  const response = await axios.post(`${API_URL}/cafe`, cafeData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });
  return response.data;
};

export const updateCafe = async (cafeData) => {

  console.log("TEST ",cafeData)
  const response = await axios.put(`${API_URL}/cafe`, cafeData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });
  return response.data;
  // const response = await axios.put(`${API_URL}/cafe`, cafeData);
  // return response.data;
};

export const deleteCafeAndEmployee = async (id) => {
  await axios.delete(`${API_URL}/cafe`, { data: { id } });
};
