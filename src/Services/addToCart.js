import axios from 'axios';

export default async (data, setToAddStatus) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/carts/addProduct`,
            {
                cartId: data.cartId,
                productId: data.productId,
                qty: data.qty
            });
        setToAddStatus("success");
        return response.data.message;
    } catch (error) {
        setToAddStatus("error");
    }
};

