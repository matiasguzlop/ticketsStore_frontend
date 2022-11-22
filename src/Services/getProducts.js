export default async () => {
    try {
        const rawData = await fetch(`${import.meta.env.VITE_API_URL}/products/all`);
        const r = await rawData.json();
        return r.message;
    } catch (error) {
        console.log(error);
        return error;
    }
};

