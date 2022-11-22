import { Card } from 'antd';
import React, { useState, useEffect } from 'react';
import getUserById from '../../Services/getUserById';
import ProductInOrderDetails from './ProductInOrderDetails';
import OrderStatus from './OrderStatus';
import OrderTotal from './OrderTotal';

function SingleOrder({ order }) {
    const [userData, setUserData] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getUserById(order.userId).then(result => {
            setIsError(false);
            setUserData(result);
        }).catch(e => setIsError(true));
    }, []);

    if (userData === null) return "Cargando...";
    if (isError) return "Error al cargar orden.";
    return (
        <Card
            style={{ margin: "1rem" }}
            title={userData.email}
            extra={<OrderStatus initialStatus={order.status} id={order._id}></OrderStatus>}
        >
            <div>
                {
                    order.products.length === 0
                        ? "No hay productos en esta orden."
                        : order.products.map(prod =>
                            <ProductInOrderDetails key={prod._id} qty={prod.qty} id={prod.productId} />
                        )
                }
                <OrderTotal>{order.total}</OrderTotal>
            </div>
        </Card>
    );
}

export default SingleOrder;