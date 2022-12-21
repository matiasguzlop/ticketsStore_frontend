import axios from 'axios';

export default async (orderId, status) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders/update`,
        {
            id: orderId,
            data: {
                status: status
            }
        });
    return response.data.message;
};

