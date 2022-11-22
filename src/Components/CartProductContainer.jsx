import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 1rem;
    border-bottom: 1px solid;
    margin: 1rem 2rem;
`;

function CartProductsContainer({ children }) {
    return (
        <Container>{children}</Container>
    );
}

export default CartProductsContainer;