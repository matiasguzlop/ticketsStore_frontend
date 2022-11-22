import axios from "axios";

export default async (data) => {
    try {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/products/new`, data);
        return result;
    } catch (error) {
        return error;
    }
};