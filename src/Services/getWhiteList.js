import axios from 'axios';

export default async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/allowedUsers/all`);
        return response.data.message;
    } catch (error) {
        console.log(error);
        return error;
    }
};

