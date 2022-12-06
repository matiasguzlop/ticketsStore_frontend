import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: center;
`;

function ProductsContainer({ children }) {
    return (
        <Container>{children}</Container>
    );
}

export default ProductsContainer;