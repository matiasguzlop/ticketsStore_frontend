import axios from "axios";

export default async function deleteOrder(id) {
    const result = await axios.delete(`${import.meta.env.VITE_API_URL}/orders/byId`, {
        data: { id: id }
    });
    return result;
}