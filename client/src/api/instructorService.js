import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getMyCourses = async () => {
    const token = sessionStorage.getItem('token');
  
    if(!token) {
      throw new Error("No access token found");
    }

    const response = await axios.get(`${API_URL}/instructor/courses`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    return response.data;
}

export const getStats = async () => {
    const token = sessionStorage.getItem('token');
  
    if(!token) {
      throw new Error("No access token found");
    }
    
    const response = await axios.get(`${API_URL}/instructor/courses/stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    return response.data;
}

export const getStudents = async () => {
    const token = sessionStorage.getItem('token');
  
    if(!token) {
      throw new Error("No access token found");
    }

    const response = await axios.get(`${API_URL}/instructor/courses/students`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
  
    return response.data;
}

export const createCourse = async (data) => {
    const token = sessionStorage.getItem('token');
  
    if(!token) {
      throw new Error("No access token found");
    }
    
    const response = await axios.post(`${API_URL}/instructor/courses`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
}

export const getProfile = async () => {
  const token = sessionStorage.getItem('token');
  
  if(!token) {
    throw new Error("No access token found");
  }
  
  const response = await axios.get(`${API_URL}/instructor/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;

}

export const updateProfile = async (data) => {
  const token = sessionStorage.getItem('token');
  
  if(!token) {
    throw new Error("No access token found");
  }

  const response = await axios.put(`${API_URL}/instructor/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export const deleteCourseById = async (id) => {
  const token = sessionStorage.getItem('token');

  if(!token) {
    throw new Error("No access token found");
  }

  const response = await axios.delete(`${API_URL}/instructor/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}