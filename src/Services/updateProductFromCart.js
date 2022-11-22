import axios from 'axios';

export default async (cartId, productId, qty, setUpdateStatus) => {
    try {
        const response = await axios
            .post(`${import.meta.env.VITE_API_URL}/carts/updateProduct`,
                { cartId, productId, qty });
        return response.data.message;
    } catch (error) {
        return error;
    }
};

