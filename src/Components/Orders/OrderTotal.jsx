import { Descriptions } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Value = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.5rem;
`;

function OrderTotal({ children }) {
    const grandTotal = parseInt(children).toLocaleString("es-CL", { currency: "CLP" });
    return (
        <Descriptions style={{ marginTop: "2rem" }}>
            <Descriptions.Item
                label="TOTAL">
                <Value>
                    {`$${grandTotal}`}
                </Value>
            </Descriptions.Item>
        </Descriptions>
    );
}

export default OrderTotal;