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
    position: relative;
    left: -10px;
    bottom: 15px;
`;

function Badge({ children, count }) {
    if (count === 0) return;
    return (
        <>
            {children}
            <BadgeContainer>{count}</BadgeContainer>
        </>
    );
}

export default Badge;