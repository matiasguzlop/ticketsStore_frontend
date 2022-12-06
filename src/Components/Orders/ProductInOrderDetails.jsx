import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getProduct from '../../Services/getProduct';

const ProductName = styled.span`
    /* font-weight: bold; */
    margin-left: 0.5rem;
    display: inline-block;
    width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:hover{
        min-width: max-content;
    }
`;

const ProductQty = styled.span`
    width: 80px;
`;

const ProductTotal = styled.span``;

const Container = styled.li`
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    &::before{
        content: "-";
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
        <Container>
            <ProductName>{productData.name}</ProductName>
            <ProductQty>{` x ${qty} un.`}</ProductQty>
            <ProductTotal>{`$${productTotal}`}</ProductTotal>
        </Container>
    );
}

export default ProductInOrderDetails;