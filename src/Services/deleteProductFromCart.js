import axios from 'axios';

export default async (cartId, productId) => {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/carts/deleteProduct`,
        {
            data: { cartId, productId }
        }
    );
    return response.data.message;
};

