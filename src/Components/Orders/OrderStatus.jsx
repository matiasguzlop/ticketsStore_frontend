import { Select, Spin } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import setOrderStatus from '../../Services/setOrderStatus';

const SpinContainer = styled.div`
        width: 150px;
        display: inline-block;
        text-align: center;
`;

const STATUS_LIST = [{
    value: "PENDING",
    label: "PENDIENTE"
},
{
    value: "PAID",
    label: "PAGADO"
},
{
    value: "DELIVERED",
    label: "ENTREGADO"
},
{
    value: "CANCELLED",
    label: "CANCELADO"
}
];

function OrderStatus({ initialStatus, id }) {
    const [reqStatus, setReqStatus] = useState({ isError: false, isLoading: false });
    const [status, setStatus] = useState(initialStatus);

    useEffect(() => {
        setReqStatus({ isError: false, isLoading: true });
        setOrderStatus(id, status)
            .then(() => setReqStatus({ isError: false, isLoading: false }))
            .catch(() => setReqStatus({ isError: true, isLoading: false }));
    }, [status]);

    const handleChange = (value) => {
        setStatus(value);
    };

    if (reqStatus.isError) return "Error";
    if (reqStatus.isLoading) return <SpinContainer><Spin /></SpinContainer>;

    return (
        <Select
            style={{ width: "150px" }}
            options={STATUS_LIST}
            onChange={handleChange}
            defaultValue={status}
        >
        </Select>
    );
}

export default OrderStatus;