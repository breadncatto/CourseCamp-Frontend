import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
export const getCourses = async () => {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
}

export const getCourseById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/courses/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCategories = async () => {
    const response = await axios.get(`${API_URL}/courses/categories`);
    return response.data;
};