import { Select, Spin } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import setOrderStatus from '../../Services/setOrderStatus';

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
    const [reqStatus, setReqStatus] = useState("loading");
    const [status, setStatus] = useState(initialStatus);
    useEffect(() => {
        setOrderStatus(id, status, setReqStatus);
    }, [status]);
    const handleChange = (value) => {
        setStatus(value);
    };
    if (reqStatus === "error") return "Error";
    if (reqStatus === "loading") return <Spin></Spin>;
    if (reqStatus === "success")
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