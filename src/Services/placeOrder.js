import axios from 'axios';

export default async (cart, userId, setOrderStatus) => {
    setOrderStatus("loading");
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders/new`,
            {
                userId: userId,
                products: cart.products,
                status: "PENDING"
            });
        setOrderStatus("success");
        return response.data.message;
    } catch (error) {
        setOrderStatus("error");
    }
};

