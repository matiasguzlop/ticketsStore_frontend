import axios from "axios";

export default async (id) => {
    try {
        const result = await axios.delete(`${import.meta.env.VITE_API_URL}/allowedusers/byId`, {
            data: { id: id },
        });
        return result;
    } catch (error) {
        return error;
        console.log(error);
    }
};