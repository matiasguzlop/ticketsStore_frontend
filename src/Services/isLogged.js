import axios from "axios";

export default async () => {
    try {
        const result = await axios
            .get(`${import.meta.env.VITE_API_URL}/accounts/isLogged`
                , { withCredentials: true });
        return result;
    } catch (error) {
        return error.response;
    }

};