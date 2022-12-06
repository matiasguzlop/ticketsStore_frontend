import axios from "axios";

export default async (newAccount)=>{
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/accounts/new`,newAccount)
    return result;
}