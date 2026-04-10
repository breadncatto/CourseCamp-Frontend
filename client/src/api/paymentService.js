import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createPayment = async (data) => {
  const token = sessionStorage.getItem('token');

  if(!token) {
    throw new Error("No access token found");
  }

  const response = await axios.post(`${API_URL}/payments/create-url`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if(response.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data;
}