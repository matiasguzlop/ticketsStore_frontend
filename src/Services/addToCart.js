import axios from 'axios';

export default async (data) => {
    const response = await axios
        .post(`${import.meta.env.VITE_API_URL}/carts/addProduct`,
            {
                cartId: data.cartId,
                productId: data.productId,
                qty: data.qty
            });
    return response.data.message;
};

