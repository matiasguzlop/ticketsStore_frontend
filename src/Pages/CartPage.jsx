import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import MyContext from '../MyContext';
import CartProduct from '../Components/Cart/CartProduct';
import CartProductsContainer from '../Components/Cart/CartProductContainer';

export default function Cart() {
    const { context, getCartImperative } = useContext(MyContext);
    useEffect(() => {
        getCartImperative();
    }, []);
    return (
        <CartProductsContainer>
            {context.cart.map(item => {
                return <CartProduct key={item._id} productId={item.productId} qty={item.qty}></CartProduct>;
            }
            )}
        </CartProductsContainer>
    );
}