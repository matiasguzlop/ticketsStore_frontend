import axios from 'axios';

export default async (userId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/carts/byUserId?id=${userId}`);
    return response.data.message.products;
};

