import { Modal, Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
    width: 100%;
    padding-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    justify-items: center;
`;

const StyledSpan = styled.span`
    text-transform: capitalize;
`;

const SpinContainer = styled.div`
    width:100%;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

function FetchLoadingMessage({ resourceName = "", verb = 'cargando' }) {
    return (
        <Container>
            <SpinContainer>
                <Spin />
            </SpinContainer>
            {
                resourceName
                    ?
                    <StyledSpan>{`${verb} ${resourceName}...`}</StyledSpan>
                    :
                    <StyledSpan>{`${verb}...`}</StyledSpan>
            }
        </Container>
    );
}

export default FetchLoadingMessage;