import axios from 'axios';

export default async (orderId, status, setReqStatus) => {
    setReqStatus("loading");
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders/update`,
            {
                id: orderId,
                data: {
                    status: status
                }
            });
        setReqStatus("success");
        return response.data.message;
    } catch (error) {
        setReqStatus("error");
    }
};

