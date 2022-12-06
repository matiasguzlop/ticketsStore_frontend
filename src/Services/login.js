import axios from "axios";

export default async (credentials) => {
    const result = await axios
        .post(`${import.meta.env.VITE_API_URL}/accounts/login`
            , credentials,
            {
                withCredentials: true
            });
    return result;
};