import { product1 } from './helpers.js';

const createProduct = async () => {
    await fetch(`http://localhost:3001/products/new`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product1)
    });
};
createProduct(product1);
