import { Card } from 'antd';
import React, { useState, useEffect } from 'react';
import getUserById from '../../Services/getUserById';
import ProductInOrderDetails from './ProductInOrderDetails';
import OrderStatus from './OrderStatus';
import OrderTotal from './OrderTotal';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import DeleteOrderModal from './DeleteOrderModal';

function SingleOrder({ order }) {
    const [shouldRender, setShouldRender] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isError, setIsError] = useState(false);

    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

    useEffect(() => {
        getUserById(order.userId).then(result => {
            setIsError(false);
            setUserData(result);
        }).catch(e => setIsError(true));
    }, []);

    if (userData === null) return "Cargando...";
    if (isError) return "Error al cargar orden.";
    if (shouldRender === false) return;
    return (
        <>
            <Card
                style={{ margin: "1rem" }}
                title={userData.email}
                extra={
                    <>
                        <Button
                            onClick={() => setShowDeleteConfirmationModal(true)}
                            danger
                            type='primary'
                        >
                            <DeleteOutlined />
                        </Button>
                        <OrderStatus initialStatus={order.status} id={order._id} />
                    </>
                }
            >
                <div>
                    <ul>
                        {
                            order.products.length === 0
                                ? "No hay productos en esta orden."
                                : order.products.map(prod =>
                                    <ProductInOrderDetails key={prod._id} qty={prod.qty} id={prod.productId} />
                                )
                        }
                    </ul>
                    <OrderTotal>{order.total}</OrderTotal>
                </div>
            </Card>
            <DeleteOrderModal
                id={order._id}
                show={showDeleteConfirmationModal}
                setShow={setShowDeleteConfirmationModal}
                onDelete={() => setShouldRender(false)}
            />
        </>
    );
}

export default SingleOrder;