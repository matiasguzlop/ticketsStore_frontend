import axios from 'axios';

export default async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/allowedUsers/all`);
    return response.data.message;
};

