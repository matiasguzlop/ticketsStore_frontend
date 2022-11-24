import axios from 'axios';

export default async (cart, userId) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders/new`,
            {
                userId: userId,
                products: cart,
                status: "PENDING"
            });
        return response.data.message;
    } catch (error) {
        console.log(error);
    }
};

