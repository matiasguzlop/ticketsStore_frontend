import axios from "axios";

export default async (id) => {
    try {
        const result = await axios.delete(`${import.meta.env.VITE_API_URL}/products/byId`, {
            data: { id: id },
        });
        // setStatus("success");
        return result;
    } catch (error) {
        return error;
        // console.log(error);
        // setStatus("error");
    }
};