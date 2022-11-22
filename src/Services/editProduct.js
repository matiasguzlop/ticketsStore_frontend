import axios from "axios";

export default async (id, data) => {
    // setStatus("loading");
    try {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/products/update`, {
            id: id,
            data: data
        });
        // setStatus("success");
        return result;
    } catch (error) {
        return error;
        // console.log(error);
        // setStatus("error");
    }
};