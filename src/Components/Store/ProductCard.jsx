import React, { useContext, useState } from 'react';
import { Button, Card, Typography, InputNumber, Divider } from 'antd';
import MyContext from '../../MyContext';
import styled from 'styled-components';
const { Title } = Typography;

const StyledInputNumber = styled(InputNumber)`
    width: 150px;
`;

const StyledCard = styled(Card)`
    width: 300px;
    border: 1px solid var(--border-light);
`;

function ProductCard({ productId, name, price, stock, setProductToCart }) {
    const { context, getCartImperative } = useContext(MyContext);
    const [qty, setQty] = useState(1);
    const localPrice = parseInt(price).toLocaleString("es-CL", { currency: "CLP" });
    return (
        <StyledCard title={name}>
            <Title level={3}>${localPrice}</Title>
            <StyledInputNumber
                addonBefore={<label>Cantidad:</label>}
                name="qty"
                width=""
                controls={true}
                min={1}
                max={parseInt(stock)}
                value={qty}
                onChange={newValue => {
                    return setQty(newValue);
                }
                } />
            <Divider></Divider>
            <Button
                type='primary'
                onClick={() => {
                    setProductToCart({ productId, cartId: context.cartId, qty, name });
                }}
            >Agregar al carro</Button>
        </StyledCard >
    );
}

export default ProductCard;