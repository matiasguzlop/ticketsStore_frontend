import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getProduct from '../../Services/getProduct';

const ProductName = styled.span`
    /* font-weight: bold; */
    &::before{
        content: "- ";
    }
`;

function ProductInOrderDetails({ qty, id }) {
    const [productData, setProductData] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getProduct(id).then(result => {
            setProductData(result);
            setIsError(false);
        }).catch(e => setIsError(true));
    }, []);

    if (isError) return "Error al cargar producto";
    if (productData === null) return "Cargando...";
    const productTotal = (parseInt(qty) * parseInt(productData.price)).toLocaleString("es-CL", { currency: "CLP" });
    return (
        <>
            <ProductName>{productData.name}</ProductName>
            {`\t x ${qty}\t\t$${productTotal}`}
        </>
    );
}

export default ProductInOrderDetails;