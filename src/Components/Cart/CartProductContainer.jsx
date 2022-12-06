import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

function CartProductsContainer({ children }) {
    return (
        <Container>{children}</Container>
    );
}

export default CartProductsContainer;