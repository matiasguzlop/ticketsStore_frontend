import React, { useEffect } from 'react';
import { useContext } from 'react';
import MyContext from '../MyContext';
import CartProduct from '../Components/Cart/CartProduct';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export default function Cart() {
    const { context, getCartImperative } = useContext(MyContext);

    useEffect(() => {
        getCartImperative();
    }, []);

    return (
        <Container>
            {context.cart.map(item =>
                <CartProduct key={item._id} productId={item.productId} qty={item.qty} />
            )}
        </Container>
    );
}