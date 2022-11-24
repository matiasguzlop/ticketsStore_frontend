import axios from "axios";

export default async function emptyCart(cartId) {
    const result = await axios.delete(`${import.meta.env.VITE_API_URL}/carts/empty`, {
        data: { cartId: cartId }
    });
    return result;
}