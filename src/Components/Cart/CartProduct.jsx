import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Descriptions, Space } from 'antd';
import getProduct from '../../Services/getProduct';
import MyContext from '../../MyContext';
import FetchErrorMessage from '../../Components/FetchErrorMessage';
import FetchLoadingMessage from '../../Components/FetchLoadingMessage';
import FormattedPrice from '../FormattedPrice';
import ProductQty from './ProductQty';
import DeleteProductButton from './DeleteProductButton';

const StyledDescriptions = styled(Descriptions)`
    margin-bottom: 2rem;
    width: 51%;
    &:not(:last-child){
        border-bottom: 1px solid var(--border-light);
        padding-bottom: 2rem;
    }
`;

function CartProduct({ productId, qty: initialQty }) {
    const { context } = useContext(MyContext);

    const [shouldRender, setShouldRender] = useState(true);

    const [productData, setProductData] = useState(null);
    const [productFetchStatus, setProductFetchStatus] = useState({ isError: false, isLoading: true });

    const [qty, setQty] = useState({ value: initialQty, needFetch: false });

    const getProductDataImperative = () => {
        setProductFetchStatus({ isError: false, isLoading: true });
        getProduct(productId)
            .then(result => {
                setProductFetchStatus({ isError: false, isLoading: false });
                setProductData(result);
            }).catch(() => setProductFetchStatus({ isError: true, isLoading: false }));
    };

    useEffect(() => getProductDataImperative, []);

    if (shouldRender === false) return;
    if (productFetchStatus.isError) return <FetchErrorMessage resourceName='producto' />;
    if (productFetchStatus.isLoading) return <FetchLoadingMessage resourceName='producto' />;

    const unitPriceFormatted = <FormattedPrice price={productData.price} />;
    const totalPriceFormatted = <FormattedPrice price={parseInt(productData.price) * parseInt(qty.value)} />;

    return (
        <>
            <StyledDescriptions
                size='small'
                title={productData.name}
                bordered={true}
                extra={
                    <Space>
                        <DeleteProductButton
                            productData={productData}
                            cartId={context.cartId}
                            productId={productId}
                            setShouldRender={setShouldRender}
                        />
                    </Space>
                }
            >
                <Descriptions.Item
                    label="Precio unitario"
                >
                    {unitPriceFormatted}
                </Descriptions.Item>
                <Descriptions.Item label='Cantidad'>
                    <ProductQty
                        qty={qty}
                        setQty={setQty}
                        cartId={context.cartId}
                        productId={productId}
                    ></ProductQty>
                </Descriptions.Item>
                <Descriptions.Item
                    label="Precio total"
                >
                    {totalPriceFormatted}
                </Descriptions.Item>
            </StyledDescriptions>
        </>
    );
}

export default CartProduct;