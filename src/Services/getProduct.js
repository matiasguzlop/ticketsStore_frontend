import axios from 'axios';

export default async (productId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/byId?id=${productId}`);
    return response.data.message;
};

