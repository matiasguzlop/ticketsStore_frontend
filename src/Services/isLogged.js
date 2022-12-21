import axios from "axios";

export default async () => {
    const result = await axios
        .get(`${import.meta.env.VITE_API_URL}/accounts/isLogged`
            , { withCredentials: true });
    return result;

};