import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getPendingCourses = async () => {
    const token = sessionStorage.getItem('token');
    
    if(!token) {
      throw new Error("No access token found");
    }

    const response = await axios.get(`${API_URL}/admin/courses/pending` , {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    return response.data;
}

export const approveCourse = async (id) => {
    const token = sessionStorage.getItem('token');

    if(!token) {
      throw new Error("No access token found");
    }

    const response = await axios.post(`${API_URL}/admin/courses/${id}/approve`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;

}

export const rejectCourse = async (id) => {
    const token = sessionStorage.getItem('token');

    if(!token) {
      throw new Error("No access token found");
    }

    const response = await axios.post(`${API_URL}/admin/courses/${id}/reject`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;

}