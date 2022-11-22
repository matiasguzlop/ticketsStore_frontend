import React from 'react';
import { Button } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import MyContext from '../MyContext';
import { useState } from 'react';
import { useEffect } from 'react';
import placeOrder from '../Services/placeOrder';

function CheckoutButton() {
    const { cart, userId } = useContext(MyContext);
    const [orderStatus, setOrderStatus] = useState(null);
    const handleClick = async () => {
        await placeOrder(cart, userId, setOrderStatus);
    };
    useEffect(() => {
        if (orderStatus === "sucess")
            cart = [];
    }, [orderStatus]);
    return (
        <Button
            onClick={handleClick}
            size='large'
            icon={<ShoppingOutlined />}
            type="primary"
        >
            Confirmar compra
        </Button>
    );
}

export default CheckoutButton;