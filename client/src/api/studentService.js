import axios from "axios";

const API_URL = "http://localhost:3000/api";
export const getStudentProfile = async () => {
  const token = sessionStorage.getItem('token');
  
  // Kiểm tra nếu chưa có token thì báo lỗi hoặc xử lý redirect (tùy logic)
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await axios.get(`${API_URL}/student/profile`, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });

  return response.data;
}

export const updateStudentProfile = async (data) => {
  const token = sessionStorage.getItem('token');

  if(!token) {
    throw new Error("No access token found");
  }

  const response = await axios.put(`${API_URL}/student/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export const getMyCourses = async () => {
  const token = sessionStorage.getItem('token');

  if(!token) {
    throw new Error("No access token found");
  }

  const response = await axios.get(`${API_URL}/student/my-courses`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export const reviewCourse = async (data) => {
  const token = sessionStorage.getItem('token');

  if(!token) {
    throw new Error("No access token found");
  }
  const response = await axios.post(`${API_URL}/student/reviews`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export const getEnrollment = async (id) => {
  const token = sessionStorage.getItem('token');

  if(!token) {
    throw new Error("No access token found");
  }

  const response = await axios.get(`${API_URL}/student/enrollments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export const updateProgress = async (data) => {
  const token = sessionStorage.getItem('token');

  if(!token) {
    throw new Error("No access token found");
  }
  const response = await axios.patch(`${API_URL}/student/progress`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}