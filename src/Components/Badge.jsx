import React from 'react';
import styled from 'styled-components';

const BadgeContainer = styled.div`
    position: absolute;
    color: #FFF;
    background-color: #C00;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 16px;
    text-align: center;
    z-index: 1;
    right: calc(120px - 24px / 2);
    bottom: calc(-24px / 3);
`;

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: right;
    width: 100%;
`;

function Badge({ children, count }) {
    return (
        <Container>
            {children}
            {
                count !== 0 &&
                <BadgeContainer>{count}</BadgeContainer>
            }
        </Container>
    );
}

export default Badge;