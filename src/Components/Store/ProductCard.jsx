import React, { useContext, useState } from 'react';
import { Button, Card, Typography, InputNumber, Divider } from 'antd';
import MyContext from '../../MyContext';
const { Title } = Typography;

function ProductCard({ productId, name, price, stock, setProductToCart }) {
    const { cartId } = useContext(MyContext);
    const [qty, setQty] = useState(1);
    const localPrice = parseInt(price).toLocaleString("es-CL", { currency: "CLP" });
    return (
        <Card title={name}>
            <Title level={3}>${localPrice}</Title>
            <InputNumber
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
                onClick={() => setProductToCart({ productId, cartId, qty, name })}
            >Agregar al carro</Button>
        </Card >
    );
}

export default ProductCard;