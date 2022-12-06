import axios from "axios";

export default async () => {
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/accounts/logout`, {}, { withCredentials: true });
    return result;
};