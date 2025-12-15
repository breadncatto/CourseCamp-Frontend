import axios from "axios";

const API_URL = "http://localhost:3000/api";
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