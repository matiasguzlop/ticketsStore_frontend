import axios from "axios";

export default async (id) => {
    const result = await axios.delete(`${import.meta.env.VITE_API_URL}/products/byId`, {
        data: { id: id },
    });
    return result;
};