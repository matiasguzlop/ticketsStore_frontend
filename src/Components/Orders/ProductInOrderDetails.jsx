import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getProduct from '../../Services/getProduct';
import FetchErrorMessage from '../FetchErrorMessage';
import FetchLoadingMessage from '../FetchLoadingMessage';
import FormattedPrice from '../FormattedPrice';


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
    const [fetchStatus, setFetchStatus] = useState({ isError: false, isLoading: false });

    useEffect(() => {
        setFetchStatus({ isError: false, isLoading: true });
        getProduct(id).then(result => {
            setProductData(result);
            setFetchStatus({ isError: false, isLoading: false });
        }).catch(() => setFetchStatus({ isError: true, isLoading: false }));
    }, []);

    if (fetchStatus.isError) return <FetchErrorMessage resourceName='producto' />;
    if (fetchStatus.isLoading) return <FetchLoadingMessage resourceName='producto' />;

    if (productData) {
        const productTotal = <FormattedPrice price={(parseInt(qty) * parseInt(productData.price))} />;
        return (
            <Container>
                <ProductName>{productData.name}</ProductName>
                <ProductQty>{` x ${qty} un.`}</ProductQty>
                <ProductTotal>{productTotal}</ProductTotal>
            </Container>
        );
    }
}

export default ProductInOrderDetails;