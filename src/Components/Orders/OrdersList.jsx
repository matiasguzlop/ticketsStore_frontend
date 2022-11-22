import React, { useState, useEffect } from 'react';
import getOrders from '../../Services/getOrders';
import SingleOrder from './SingleOrder';


export default function Orders() {
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getOrders().then(result => {
            setIsError(false);
            setData(result);
        }).catch(e => setIsError(true));
    }, []);

    if (isError) return "Error al cargar órdenes.";
    if (data === null) return "Cargando...";
    return (
        data.length === 0
            ? "Aún no hay órdenes de compra."
            : data.map(order =>
                <SingleOrder order={order} key={order._id}></SingleOrder>
            )
    );
}

