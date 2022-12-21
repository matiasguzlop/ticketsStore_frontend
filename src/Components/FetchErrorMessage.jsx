import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { WarningOutlined } from '@ant-design/icons';

const Container = styled.section`
    width: 100%;
    padding-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    justify-items: center;
`;

const IconContainer = styled.div`
    width: 100%;
    text-align: center;
    svg{
        fill: red;
        line-height: 30px;
        height: 30px;
        width: 30px;
    }
`;

function FetchErrorMessage({ resourceName, deployed = true, type = 'span', verb = 'obtener' }) {
    if (type === 'modal') {
        const [show, setShow] = useState(deployed);
        return (
            <Modal
                title='Error'
                open={show}
                onCancel={() => setShow(false)}
                footer={<Button danger type='primary' onClick={() => setShow(false)}>OK</Button>}
            >
                {`Error al ${verb} ${resourceName}.`}
            </Modal>
        );
    }


    if (type === 'span')
        return (
            <Container>
                <IconContainer>
                    <WarningOutlined />
                </IconContainer>
                {
                    resourceName ?
                        <span>{`Error al ${verb} ${resourceName}.`}</span>
                        :
                        <span>Error</span>
                }
            </Container>
        );

}

export default FetchErrorMessage;