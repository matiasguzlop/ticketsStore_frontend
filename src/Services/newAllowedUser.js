import axios from "axios";

export default async (data) => {
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/allowedusers/new`, data);
    return result;

};