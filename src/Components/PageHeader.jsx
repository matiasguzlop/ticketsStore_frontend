import React from 'react';
import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons';

const Container = styled.header`
    margin: 0.2rem 1rem;
    display: grid;
    grid-template-columns: 1fr 4fr 2fr;
    grid-template-rows: min-content 4rem;
    align-items: center;
    h1{
        font-size: 2rem;
        margin:0;
        grid-row: 1/3;
        grid-column: 2/3;
    }
`;

const Right = styled.div`
    grid-row: 2/3;
    grid-column: 3/4;
    text-align: right;
`;

const BackButton = styled.button`
    grid-row: 1/3;
    grid-column: 1/2;
    border: none;
    padding: 1rem;
    cursor:pointer;
    width: fit-content;
    font-size: 2rem;
`;

const TopRight = styled.div`
    grid-row: 1/2;
    grid-column: 3/4;
    text-align: right;
`;

function PageHeader({
    title,
    subTitle,
    onBack,
    right,
    topRight
}) {
    return (
        <Container>
            <TopRight>{topRight}</TopRight>
            <BackButton onClick={onBack}>
                <LeftOutlined />
            </BackButton>
            <h1>{title}</h1>
            <Right>{right}</Right>
        </Container>
    );
}

export default PageHeader;